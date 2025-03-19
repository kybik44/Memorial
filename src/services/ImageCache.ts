// Cache for storing preloaded images with expiration
interface CachedImage {
  element: HTMLImageElement;
  timestamp: number;
  expiresAt: number;
  lowQuality?: HTMLImageElement; // Низкокачественная версия для предпросмотра
}

interface ImageDimensions {
  width: number;
  height: number;
}

class ImageCache {
  private cache: Map<string, CachedImage>;
  private dimensionsCache: Map<string, ImageDimensions>; // Кэш размеров изображений
  private maxSize: number;
  private cacheExpiration: number;
  private preloadQueue: Array<{ src: string; priority: number }>; // Добавлен приоритет
  private isPreloading: boolean;
  private maxConcurrentLoads: number;
  private useThumbnails: boolean;
  private thumbnailWidth: number;
  private resizeEndpoint: string | null;

  constructor(
    options: {
      maxSize?: number;
      cacheExpiration?: number;
      maxConcurrentLoads?: number;
      useThumbnails?: boolean;
      thumbnailWidth?: number;
      resizeEndpoint?: string;
    } = {}
  ) {
    this.cache = new Map();
    this.dimensionsCache = new Map();
    this.maxSize = options.maxSize || 100; // Maximum number of images to cache
    this.cacheExpiration = options.cacheExpiration || 30 * 60 * 1000; // 30 minutes
    this.preloadQueue = [];
    this.isPreloading = false;
    this.maxConcurrentLoads = options.maxConcurrentLoads || 4;
    this.useThumbnails = options.useThumbnails || true;
    this.thumbnailWidth = options.thumbnailWidth || 100; // Ширина превью по умолчанию
    this.resizeEndpoint = options.resizeEndpoint || null; // Эндпоинт для ресайза изображений
  }

  /**
   * Генерирует URL для оптимизированного изображения нужного размера
   * @param src Оригинальный URL изображения
   * @param width Запрашиваемая ширина
   * @param isLowQuality Флаг для получения низкокачественной версии
   * @returns URL оптимизированного изображения
   */
  private getOptimizedImageUrl(
    src: string,
    width: number,
    isLowQuality: boolean = false
  ): string {
    // Если определен конкретный эндпоинт для ресайза изображений - используем его
    if (this.resizeEndpoint) {
      const quality = isLowQuality ? 10 : 80;

      try {
        // Формируем URL для CDN или эндпоинта ресайза
        // Пример: /resize?url=<encoded-url>&width=400&quality=80
        return `${this.resizeEndpoint}?url=${encodeURIComponent(src)}&width=${width}&quality=${quality}`;
      } catch (e) {
        // Если это не валидный URL, возвращаем исходный
        return src;
      }
    }

    // Проверяем, это URL из Cloudinary, Imgix или другого CDN с поддержкой ресайза
    if (src.includes("cloudinary.com")) {
      // Пример работы с Cloudinary
      // from: https://res.cloudinary.com/demo/image/upload/sample.jpg
      // to:   https://res.cloudinary.com/demo/image/upload/w_400,q_auto/sample.jpg
      const parts = src.split("/upload/");
      if (parts.length === 2) {
        const quality = isLowQuality ? "q_10" : "q_auto";
        return `${parts[0]}/upload/w_${width},${quality}/${parts[1]}`;
      }
    } else if (src.includes("digitaloceanspaces.com")) {
      // Если это S3 или DigitalOcean Spaces, просто возвращаем оригинал
      // Если есть возможность, лучше настроить CDN с ресайзом поверх хранилища
      return src;
    }

    // По умолчанию, если не можем оптимизировать, возвращаем исходное изображение
    return src;
  }

  /**
   * Получает размеры изображения
   * @param src URL изображения
   * @returns Promise с размерами изображения
   */
  public getImageDimensions(src: string): Promise<ImageDimensions> {
    // Проверяем, есть ли размеры в кэше
    const cachedDimensions = this.dimensionsCache.get(src);
    if (cachedDimensions) {
      return Promise.resolve(cachedDimensions);
    }

    // Получаем размеры через загрузку изображения
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const dimensions = {
          width: img.naturalWidth,
          height: img.naturalHeight,
        };
        // Сохраняем в кэш
        this.dimensionsCache.set(src, dimensions);
        resolve(dimensions);
      };
      img.onerror = () => {
        // В случае ошибки возвращаем стандартные размеры
        resolve({ width: 800, height: 600 });
      };
      img.src = src;
    });
  }

  /**
   * Preloads an image and caches it
   * @param src Image URL to preload
   * @param width Optional width for optimized version
   * @returns Promise that resolves when the image is loaded
   */
  public preload(src: string, width?: number): Promise<HTMLImageElement> {
    // If image is already in cache and not expired, return it
    const cached = this.getFromCache(src);
    if (cached) {
      return Promise.resolve(cached);
    }

    // Add to preload queue with normal priority
    this.preloadQueue.push({ src, priority: 1 });
    if (!this.isPreloading) {
      this.processQueue();
    }

    // Return a promise that resolves when the image is loaded
    return new Promise((resolve, reject) => {
      const checkInterval = setInterval(() => {
        const image = this.getFromCache(src);
        if (image) {
          clearInterval(checkInterval);
          resolve(image);
        }
      }, 100);

      // Set a timeout to prevent infinite checking
      setTimeout(() => {
        clearInterval(checkInterval);
        // If it's not in cache after timeout, load it directly
        const targetWidth = width || 800; // Используем переданную ширину или 800px по умолчанию
        this.loadImage(src, targetWidth).then(resolve).catch(reject);
      }, 5000);
    });
  }

  /**
   * Preloads a list of images and caches them
   * @param sources Array of image URLs to preload
   * @param highPriority Whether these images should be preloaded with high priority
   */
  public preloadBatch(sources: string[], highPriority: boolean = false): void {
    const priority = highPriority ? 2 : 1;

    // Filter out duplicates and already cached images
    const uniqueSources = sources.filter(
      (src) =>
        !this.preloadQueue.some((item) => item.src === src) &&
        !this.getFromCache(src)
    );

    // Add to queue with priority
    this.preloadQueue.push(...uniqueSources.map((src) => ({ src, priority })));

    // Sort queue by priority (higher first)
    this.preloadQueue.sort((a, b) => b.priority - a.priority);

    // Start processing if not already
    if (!this.isPreloading) {
      this.processQueue();
    }
  }

  /**
   * Gets an image from cache if available
   * @param src Image URL
   * @returns HTMLImageElement if in cache, null otherwise
   */
  public getFromCache(src: string): HTMLImageElement | null {
    const cached = this.cache.get(src);
    const now = Date.now();

    if (cached) {
      // If expired, remove from cache
      if (cached.expiresAt < now) {
        this.cache.delete(src);
        return null;
      }

      // Update timestamp on access to implement LRU
      cached.timestamp = now;
      return cached.element;
    }

    return null;
  }

  /**
   * Получает низкокачественную версию изображения из кэша
   * @param src URL изображения
   * @returns HTMLImageElement с низкокачественной версией или null
   */
  public getLowQualityFromCache(src: string): HTMLImageElement | null {
    const cached = this.cache.get(src);

    if (cached && cached.lowQuality) {
      return cached.lowQuality;
    }

    return null;
  }

  /**
   * Loads and caches a batch of images from the queue
   */
  private async processQueue(): Promise<void> {
    if (this.preloadQueue.length === 0) {
      this.isPreloading = false;
      return;
    }

    this.isPreloading = true;

    // Process up to maxConcurrentLoads images at a time
    const batch = this.preloadQueue.splice(0, this.maxConcurrentLoads);

    // Load all images in the batch concurrently
    await Promise.allSettled(batch.map((item) => this.loadImage(item.src)));

    // Continue with next batch
    this.processQueue();
  }

  /**
   * Loads a single image and adds it to cache
   * @param src Image URL
   * @param targetWidth Optional width for optimized version
   * @returns Promise with the loaded image
   */
  private async loadImage(
    src: string,
    targetWidth?: number
  ): Promise<HTMLImageElement> {
    // Если включен режим предзагрузки низкокачественных версий
    if (this.useThumbnails) {
      try {
        // Сначала загружаем низкокачественную версию
        const lowQualitySrc = this.getOptimizedImageUrl(
          src,
          this.thumbnailWidth,
          true
        );
        const lowQualityImage = await this.loadSingleImage(lowQualitySrc);

        // Добавляем ее в кэш
        const cachedEntry = this.cache.get(src) || {
          element: new Image(),
          timestamp: Date.now(),
          expiresAt: Date.now() + this.cacheExpiration,
        };

        cachedEntry.lowQuality = lowQualityImage;
        this.cache.set(src, cachedEntry);
      } catch (error) {
        console.warn("Failed to load low quality image:", error);
      }
    }

    // Определяем оптимальную ширину для загрузки
    let width = targetWidth;
    if (!width) {
      try {
        // Если возможно, получаем реальный размер изображения
        const dimensions = await this.getImageDimensions(src);
        // Ограничиваем размер загружаемого изображения до 1600px
        width = Math.min(dimensions.width, 1600);
      } catch {
        width = 800; // По умолчанию 800px
      }
    }

    // Получаем оптимизированный URL для полноразмерного изображения
    const optimizedSrc = this.getOptimizedImageUrl(src, width, false);

    // Загружаем оптимизированное изображение
    try {
      const fullImage = await this.loadSingleImage(optimizedSrc);
      this.addToCache(src, fullImage);
      return fullImage;
    } catch (error) {
      // Если не удалось загрузить оптимизированную версию, попробуем оригинал
      console.warn(
        "Failed to load optimized image, falling back to original:",
        error
      );
      const originalImage = await this.loadSingleImage(src);
      this.addToCache(src, originalImage);
      return originalImage;
    }
  }

  /**
   * Загружает отдельное изображение без кэширования
   * @param src URL изображения
   * @returns Promise с загруженным изображением
   */
  private loadSingleImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();

      img.onload = () => {
        resolve(img);
      };

      img.onerror = (error) => {
        reject(error);
      };

      img.src = src;
    });
  }

  /**
   * Adds an image to the cache
   * @param src Image URL
   * @param element HTMLImageElement to cache
   */
  private addToCache(src: string, element: HTMLImageElement): void {
    const now = Date.now();

    // Проверяем, уже есть ли это изображение в кэше
    const existing = this.cache.get(src);

    // If cache is full, remove least recently used item
    if (!existing && this.cache.size >= this.maxSize) {
      let oldestKey: string | null = null;
      let oldestTimestamp = Infinity;

      this.cache.forEach((cachedImg, key) => {
        if (cachedImg.timestamp < oldestTimestamp) {
          oldestTimestamp = cachedImg.timestamp;
          oldestKey = key;
        }
      });

      if (oldestKey) {
        this.cache.delete(oldestKey);
      }
    }

    // Add to cache with expiration
    if (existing) {
      // Если уже есть в кэше, обновляем основное изображение, но сохраняем lowQuality
      existing.element = element;
      existing.timestamp = now;
      existing.expiresAt = now + this.cacheExpiration;
    } else {
      // Иначе создаем новую запись
      this.cache.set(src, {
        element,
        timestamp: now,
        expiresAt: now + this.cacheExpiration,
      });
    }
  }

  /**
   * Clears all images from cache
   */
  public clearCache(): void {
    this.cache.clear();
    this.dimensionsCache.clear();
  }

  /**
   * Removes expired images from cache
   */
  public cleanup(): void {
    const now = Date.now();
    this.cache.forEach((cachedImg, key) => {
      if (cachedImg.expiresAt < now) {
        this.cache.delete(key);
      }
    });
  }

  /**
   * Устанавливает настройки кэша
   * @param options Параметры конфигурации
   */
  public configure(options: {
    maxSize?: number;
    cacheExpiration?: number;
    maxConcurrentLoads?: number;
    useThumbnails?: boolean;
    thumbnailWidth?: number;
    resizeEndpoint?: string;
  }): void {
    if (options.maxSize !== undefined) this.maxSize = options.maxSize;
    if (options.cacheExpiration !== undefined)
      this.cacheExpiration = options.cacheExpiration;
    if (options.maxConcurrentLoads !== undefined)
      this.maxConcurrentLoads = options.maxConcurrentLoads;
    if (options.useThumbnails !== undefined)
      this.useThumbnails = options.useThumbnails;
    if (options.thumbnailWidth !== undefined)
      this.thumbnailWidth = options.thumbnailWidth;
    if (options.resizeEndpoint !== undefined)
      this.resizeEndpoint = options.resizeEndpoint;
  }
}

// Create singleton instance
const imageCache = new ImageCache({
  maxSize: 200, // Увеличен размер кэша
  maxConcurrentLoads: 3, // Меньше одновременных загрузок для меньшей нагрузки на сеть
  useThumbnails: true,
  thumbnailWidth: 100,
});

// Run cleanup every 5 minutes
setInterval(
  () => {
    imageCache.cleanup();
  },
  5 * 60 * 1000
);

export default imageCache;
