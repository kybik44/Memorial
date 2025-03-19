import { useState, useEffect, useCallback } from "react";
import imageCache from "../services/ImageCache";

interface UseGalleryHook {
  open: boolean;
  currentImageIndex: number;
  loading: boolean;
  images: string[];
  setImages: (images: string[]) => void;
  handleImage: (index: number) => void;
  handlePrev: () => void;
  handleNext: () => void;
  handleClose: () => void;
}

/**
 * Хук для работы с галереей изображений
 * Обеспечивает кэширование, предзагрузку соседних изображений и управление состоянием
 */
const useGallery = (): UseGalleryHook => {
  const [open, setOpen] = useState<boolean>(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [images, setImages] = useState<string[]>([]);

  // Предзагрузка текущего и соседних изображений при изменении индекса
  useEffect(() => {
    if (!open || !images.length) return;

    // Сбрасываем статус загрузки при смене изображения
    setLoading(true);

    // Получаем текущее изображение и проверяем, загружено ли оно
    const currentImage = images[currentImageIndex];
    const isCached = imageCache.getFromCache(currentImage) !== null;

    if (isCached) {
      // Если изображение уже в кэше, сразу сбрасываем статус загрузки
      setLoading(false);
    } else {
      // Иначе загружаем его с высоким приоритетом
      imageCache.preload(currentImage, 1600)
        .then(() => setLoading(false))
        .catch(() => setLoading(false));
    }

    // Предзагрузка соседних изображений с низким приоритетом
    const preloadNeighbors = () => {
      // Определяем индексы соседних изображений
      const prevIndex = currentImageIndex > 0 ? currentImageIndex - 1 : null;
      const nextIndex = currentImageIndex < images.length - 1 ? currentImageIndex + 1 : null;

      // Создаем массив для предзагрузки
      const imagesToPreload: string[] = [];

      // Предзагружаем предыдущее изображение, если оно существует
      if (prevIndex !== null) {
        imagesToPreload.push(images[prevIndex]);
      }

      // Предзагружаем следующее изображение, если оно существует
      if (nextIndex !== null) {
        imagesToPreload.push(images[nextIndex]);
      }

      // Предзагружаем все соседние изображения
      if (imagesToPreload.length > 0) {
        imageCache.preloadBatch(imagesToPreload, false);
      }
    };

    // Запускаем предзагрузку с небольшой задержкой, чтобы не мешать загрузке текущего изображения
    setTimeout(preloadNeighbors, 500);
  }, [currentImageIndex, images, open]);

  // Обработчик открытия изображения по индексу
  const handleImage = useCallback((index: number) => {
    setCurrentImageIndex(index);
    setOpen(true);
  }, []);

  // Обработчик перехода к предыдущему изображению
  const handlePrev = useCallback(() => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  }, [currentImageIndex]);

  // Обработчик перехода к следующему изображению
  const handleNext = useCallback(() => {
    if (currentImageIndex < images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  }, [currentImageIndex, images.length]);

  // Обработчик закрытия галереи
  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  return {
    open,
    currentImageIndex,
    loading,
    images,
    setImages,
    handleImage,
    handlePrev,
    handleNext,
    handleClose,
  };
};

export default useGallery;
