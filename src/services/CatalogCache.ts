import { Catalog, CatalogListItem } from "../api/types";

/**
 * CatalogCache - Service for caching catalog data
 * 
 * This service provides an alternative/complement to the context-based cache
 * by providing persistent caching between page refreshes using localStorage.
 */

// Define cache entry structure with expiration
interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiresAt: number;
}

// Define cache structure
interface CatalogCacheStore {
  catalogList?: CacheEntry<Catalog[]>;
  categoryDetails: Record<string, CacheEntry<Catalog>>;
  items: Record<string, CacheEntry<{ 
    results: CatalogListItem[]; 
    count: number;
  }>>;
}

// Cache expiration times (in milliseconds)
export const CACHE_EXPIRATION = {
  CATALOG_LIST: 60 * 60 * 1000, // 1 hour
  CATEGORY_DETAILS: 60 * 60 * 1000, // 1 hour
  ITEMS: 30 * 60 * 1000, // 30 minutes
};

// Local storage keys
const STORAGE_KEY = 'catalog_cache';
const VERSION_KEY = 'catalog_cache_version';
const CURRENT_VERSION = '1.0.0'; // Change when cache structure changes

class CatalogCacheService {
  private cache: CatalogCacheStore;
  private initialized: boolean = false;

  constructor() {
    this.cache = {
      categoryDetails: {},
      items: {},
    };
    this.initCache();
  }

  /**
   * Initializes the cache from localStorage
   */
  private initCache(): void {
    try {
      // Check cache version
      const cacheVersion = localStorage.getItem(VERSION_KEY);
      
      // If version doesn't match, clear the cache
      if (cacheVersion !== CURRENT_VERSION) {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.setItem(VERSION_KEY, CURRENT_VERSION);
      }
      
      // Try to load cache from localStorage
      const cachedData = localStorage.getItem(STORAGE_KEY);
      if (cachedData) {
        this.cache = JSON.parse(cachedData);
        
        // Clean expired entries
        this.cleanExpiredEntries();
      }
      
      this.initialized = true;
    } catch (error) {
      console.error('Error initializing catalog cache:', error);
      // Reset cache in case of error
      this.clearCache();
    }
  }

  /**
   * Saves the current cache to localStorage
   */
  private saveCache(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.cache));
    } catch (error) {
      console.error('Error saving catalog cache:', error);
      // If localStorage fails (e.g., quota exceeded), clear it and try again
      try {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.cache));
      } catch (e) {
        // If still failing, just clear and give up
        this.clearCache();
      }
    }
  }

  /**
   * Removes expired entries from the cache
   */
  private cleanExpiredEntries(): void {
    const now = Date.now();
    
    // Check catalog list
    if (this.cache.catalogList && this.cache.catalogList.expiresAt < now) {
      delete this.cache.catalogList;
    }
    
    // Check category details
    Object.keys(this.cache.categoryDetails).forEach(key => {
      const entry = this.cache.categoryDetails[key];
      if (entry.expiresAt < now) {
        delete this.cache.categoryDetails[key];
      }
    });
    
    // Check items
    Object.keys(this.cache.items).forEach(key => {
      const entry = this.cache.items[key];
      if (entry.expiresAt < now) {
        delete this.cache.items[key];
      }
    });
    
    // Save cleaned cache
    this.saveCache();
  }

  /**
   * Clears the entire cache
   */
  public clearCache(): void {
    this.cache = {
      categoryDetails: {},
      items: {},
    };
    localStorage.removeItem(STORAGE_KEY);
    localStorage.setItem(VERSION_KEY, CURRENT_VERSION);
  }

  /**
   * Gets catalog list from cache
   * @returns Catalog list array or undefined if not in cache
   */
  public getCatalogList(): Catalog[] | undefined {
    if (!this.initialized) this.initCache();
    
    const entry = this.cache.catalogList;
    const now = Date.now();
    
    if (entry && entry.expiresAt > now) {
      return entry.data;
    }
    
    return undefined;
  }

  /**
   * Sets catalog list in cache
   * @param data Catalog list to cache
   */
  public setCatalogList(data: Catalog[]): void {
    if (!this.initialized) this.initCache();
    
    const now = Date.now();
    this.cache.catalogList = {
      data,
      timestamp: now,
      expiresAt: now + CACHE_EXPIRATION.CATALOG_LIST
    };
    
    this.saveCache();
  }

  /**
   * Gets category details from cache
   * @param slug Category slug
   * @returns Category details or undefined if not in cache
   */
  public getCategoryDetails(slug: string): Catalog | undefined {
    if (!this.initialized) this.initCache();
    
    const entry = this.cache.categoryDetails[slug];
    const now = Date.now();
    
    if (entry && entry.expiresAt > now) {
      return entry.data;
    }
    
    return undefined;
  }

  /**
   * Sets category details in cache
   * @param slug Category slug
   * @param data Category details to cache
   */
  public setCategoryDetails(slug: string, data: Catalog): void {
    if (!this.initialized) this.initCache();
    
    const now = Date.now();
    this.cache.categoryDetails[slug] = {
      data,
      timestamp: now,
      expiresAt: now + CACHE_EXPIRATION.CATEGORY_DETAILS
    };
    
    this.saveCache();
  }

  /**
   * Gets items from cache
   * @param cacheKey Unique key for items request
   * @returns Items and count or undefined if not in cache
   */
  public getItems(cacheKey: string): { results: CatalogListItem[], count: number } | undefined {
    if (!this.initialized) this.initCache();
    
    const entry = this.cache.items[cacheKey];
    const now = Date.now();
    
    if (entry && entry.expiresAt > now) {
      return entry.data;
    }
    
    return undefined;
  }

  /**
   * Sets items in cache
   * @param cacheKey Unique key for items request
   * @param data Items and count to cache
   */
  public setItems(cacheKey: string, data: { results: CatalogListItem[], count: number }): void {
    if (!this.initialized) this.initCache();
    
    const now = Date.now();
    this.cache.items[cacheKey] = {
      data,
      timestamp: now,
      expiresAt: now + CACHE_EXPIRATION.ITEMS
    };
    
    this.saveCache();
  }
}

// Export singleton instance
const catalogCache = new CatalogCacheService();
export default catalogCache; 