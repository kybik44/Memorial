import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { getCatalogDetails, getCatalogList, getItemsList } from "/api/api";
import { Catalog, CatalogListItem, ItemsListParams } from "/api/types";
import catalogCache from "/services/CatalogCache";

// Define the cache structure
interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiresAt: number;
}

// Cache interface
interface ApiCache {
  items: Record<
    string,
    CacheEntry<{ results: CatalogListItem[]; count: number }>
  >;
  catalogList: CacheEntry<Catalog[]> | null;
  catalogDetails: Record<string, CacheEntry<Catalog>>;
}

// Cache expiration time (in milliseconds)
const CACHE_EXPIRATION = {
  ITEMS: 5 * 60 * 1000, // 5 minutes
  CATALOG_LIST: 15 * 60 * 1000, // 15 minutes
  CATALOG_DETAILS: 10 * 60 * 1000, // 10 minutes
};

interface CatalogContextType {
  catalogs: Catalog[];
  currentItems: CatalogListItem[];
  loading: boolean;
  loadingItems: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  currentCategory: Catalog | null;
  setCurrentPage: (page: number) => void;
  fetchCatalogList: () => Promise<Catalog[]>;
  fetchCatalogDetails: (slug: string) => Promise<Catalog | undefined>;
  fetchItems: (params?: ItemsListParams) => Promise<void>;
  resetItems: () => void;
  setCurrentItems: (items: CatalogListItem[]) => void;
  setCurrentCategory: (category: Catalog | null) => void;
  catalogStructure: Record<string, Catalog>;
  getCurrentCategoryPath: (slug: string) => Catalog[];
  clearCache: () => void;
}

const CatalogContext = createContext<CatalogContextType | undefined>(undefined);

// Helper function to generate a cache key
const generateCacheKey = (params?: ItemsListParams): string => {
  if (!params) return "all";

  // Sort keys for consistent cache key generation
  return Object.keys(params)
    .sort()
    .map((key) => `${key}:${params[key as keyof ItemsListParams]}`)
    .join("|");
};

// Helper to parse slug from pathname
const parseSlugFromPath = (pathname: string): string | null => {
  const pathParts = pathname.split("/").filter(Boolean);

  if (pathParts[0] !== "catalog" || pathParts.length <= 1) {
    return null;
  }

  // Ensure we're not looking at a product ID
  if (pathParts.length === 2) {
    // /catalog/{slug} or /catalog/{id}
    const isId = !isNaN(Number(pathParts[1]));
    return isId ? null : pathParts[1];
  } else if (pathParts.length > 2) {
    // /catalog/{category}/{subcategory} or /catalog/{category}/{id}
    const isLastPartId = !isNaN(Number(pathParts[pathParts.length - 1]));

    if (isLastPartId) {
      // If it's a product page, return the parent category
      return pathParts.length > 3
        ? `${pathParts[1]}/${pathParts[2]}` // /catalog/cat/subcat/123
        : pathParts[1]; // /catalog/cat/123
    } else {
      // It's a category page
      return pathParts.length > 2
        ? `${pathParts[1]}/${pathParts[2]}` // /catalog/cat/subcat
        : pathParts[1]; // /catalog/cat (should be handled by first condition)
    }
  }

  return null;
};

export const CatalogProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [catalogs, setCatalogs] = useState<Catalog[]>([]);
  const [currentItems, setCurrentItems] = useState<CatalogListItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingItems, setLoadingItems] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [currentCategory, setCurrentCategory] = useState<Catalog | null>(null);
  const [catalogStructure, setCatalogStructure] = useState<
    Record<string, Catalog>
  >({});

  // Prevent duplicate requests on mount
  const initialLoadRef = useRef(false);

  // Create ref for the cache to avoid re-renders when cache updates
  const cacheRef = useRef<ApiCache>({
    items: {},
    catalogList: null,
    catalogDetails: {},
  });

  // Function to clear cache
  const clearCache = useCallback(() => {
    cacheRef.current = {
      items: {},
      catalogList: null,
      catalogDetails: {},
    };

    // Also clear the localStorage cache
    catalogCache.clearCache();
  }, []);

  const buildCatalogStructure = useCallback((catalogs: Catalog[]) => {
    const structure: Record<string, Catalog> = {};

    const processCatalog = (catalog: Catalog) => {
      structure[catalog.full_slug] = catalog;

      if (catalog.children) {
        Object.values(catalog.children).forEach((child) => {
          processCatalog(child);
        });
      }
    };

    catalogs.forEach((catalog) => {
      processCatalog(catalog);
    });

    setCatalogStructure(structure);
  }, []);

  const getCurrentCategoryPath = useCallback(
    (slug: string): Catalog[] => {
      const path: Catalog[] = [];
      const slugParts = slug.split("/");
      let currentSlug = "";

      for (const part of slugParts) {
        currentSlug = currentSlug ? `${currentSlug}/${part}` : part;
        const category = catalogStructure[currentSlug];
        if (category) {
          path.push(category);
        }
      }

      return path;
    },
    [catalogStructure]
  );

  const fetchCatalogList = useCallback(async () => {
    try {
      setLoading(true);

      // First check localStorage cache
      const persistentCachedData = catalogCache.getCatalogList();
      if (persistentCachedData) {
        console.log("Using persistently cached catalog list data");
        setCatalogs(persistentCachedData);
        buildCatalogStructure(persistentCachedData);
        setLoading(false);
        return persistentCachedData;
      }

      // Then check in-memory cache
      const cachedData = cacheRef.current.catalogList;
      const now = Date.now();

      if (cachedData && cachedData.expiresAt > now) {
        console.log("Using in-memory cached catalog list data");
        setCatalogs(cachedData.data);
        buildCatalogStructure(cachedData.data);

        // Also update the persistent cache for future sessions
        catalogCache.setCatalogList(cachedData.data);

        setLoading(false);
        return cachedData.data;
      }

      // If no valid cache, fetch from API
      const response = await getCatalogList();
      if (response) {
        // Update state
        setCatalogs(response.results);
        buildCatalogStructure(response.results);

        // Cache the results in memory
        cacheRef.current.catalogList = {
          data: response.results,
          timestamp: now,
          expiresAt: now + CACHE_EXPIRATION.CATALOG_LIST,
        };

        // Cache the results in localStorage
        catalogCache.setCatalogList(response.results);

        return response.results;
      }

      return [];
    } catch (error) {
      setError("Ошибка при загрузке каталога");
      console.error("Error fetching catalog:", error);
      return [];
    } finally {
      setLoading(false);
    }
  }, [buildCatalogStructure]);

  const fetchCatalogDetails = useCallback(async (slug: string) => {
    try {
      // Check if we have a persistent cached data
      const persistentCachedData = catalogCache.getCategoryDetails(slug);
      if (persistentCachedData) {
        console.log(`Using persistently cached catalog details for ${slug}`);
        return persistentCachedData;
      }

      // Check if we have in-memory cached data
      const cachedData = cacheRef.current.catalogDetails[slug];
      const now = Date.now();

      if (cachedData && cachedData.expiresAt > now) {
        console.log(`Using in-memory cached catalog details for ${slug}`);
        // Also update persistent cache for future sessions
        catalogCache.setCategoryDetails(slug, cachedData.data);
        return cachedData.data;
      }

      // If no valid cache, fetch from API
      const details = await getCatalogDetails(slug);

      // Cache the results if we got a valid response
      if (details) {
        // Cache in memory
        cacheRef.current.catalogDetails[slug] = {
          data: details,
          timestamp: now,
          expiresAt: now + CACHE_EXPIRATION.CATALOG_DETAILS,
        };

        // Cache in localStorage
        catalogCache.setCategoryDetails(slug, details);
      }

      return details;
    } catch (error) {
      console.error("Error fetching catalog details:", error);
      return undefined;
    }
  }, []);

  const fetchItems = useCallback(
    async (params?: ItemsListParams) => {
      try {
        // Set loading immediately
        setLoadingItems(true);

        // Prepare params with defaults
        let finalParams = { ...params };

        // Extract the current path and slug from the URL if not provided in params
        if (!finalParams?.slug) {
          const slug = parseSlugFromPath(window.location.pathname);
          if (slug) {
            finalParams.slug = slug;
          }
        }

        // If no page is specified, try to get it from the URL
        if (!finalParams?.page) {
          const urlParams = new URLSearchParams(window.location.search);
          const pageParam = urlParams.get("page");
          if (pageParam) {
            finalParams.page = parseInt(pageParam, 10);
          } else {
            finalParams.page = currentPage;
          }
        }

        // Generate a unique cache key based on the params
        const cacheKey = generateCacheKey(finalParams);

        console.log(`Fetching items with params:`, finalParams);

        // First check localStorage cache
        const persistentCachedData = catalogCache.getItems(cacheKey);
        if (persistentCachedData) {
          console.log(`Using persistent cached items for ${cacheKey}`);

          // Wait a short time for smoother UI transitions
          await new Promise((resolve) => setTimeout(resolve, 100));

          setCurrentItems(persistentCachedData.results || []);
          setTotalPages(persistentCachedData.count || 0);

          if (finalParams.slug && catalogs.length > 0) {
            // Try to set current category
            const slugParts = finalParams.slug.split("/");
            let category = null;

            if (slugParts.length === 2) {
              // Find parent category
              const parentCategory = catalogs.find(
                (cat) => cat.slug === slugParts[0]
              );
              if (parentCategory && parentCategory.children) {
                // Find subcategory
                category =
                  Object.values(parentCategory.children).find(
                    (child) => child.slug === slugParts[1]
                  ) || null;
              }
            } else if (slugParts.length === 1) {
              category =
                catalogs.find((cat) => cat.slug === slugParts[0]) || null;
            }

            if (category) {
              setCurrentCategory(category);
            }
          } else if (!finalParams.slug) {
            setCurrentCategory(null);
          }

          setTimeout(() => {
            setLoadingItems(false);
          }, 100);

          return;
        }

        // Check if we have in-memory cached data
        const cachedData = cacheRef.current.items[cacheKey];
        const now = Date.now();

        if (cachedData && cachedData.expiresAt > now) {
          console.log(`Using in-memory cached items for ${cacheKey}`);

          // Wait a shorter time before updating UI to ensure smooth transitions
          await new Promise((resolve) => setTimeout(resolve, 100));

          setCurrentItems(cachedData.data.results || []);
          setTotalPages(cachedData.data.count || 0);

          if (finalParams.slug && catalogs.length > 0) {
            // Try to set current category
            const slugParts = finalParams.slug.split("/");
            let category = null;

            if (slugParts.length === 2) {
              // Find parent category
              const parentCategory = catalogs.find(
                (cat) => cat.slug === slugParts[0]
              );
              if (parentCategory && parentCategory.children) {
                // Find subcategory
                category =
                  Object.values(parentCategory.children).find(
                    (child) => child.slug === slugParts[1]
                  ) || null;
              }
            } else if (slugParts.length === 1) {
              category =
                catalogs.find((cat) => cat.slug === slugParts[0]) || null;
            }

            if (category) {
              setCurrentCategory(category);
            }
          } else if (!finalParams.slug) {
            setCurrentCategory(null);
          }

          // Also update persistent cache for future sessions
          catalogCache.setItems(cacheKey, cachedData.data);

          setTimeout(() => {
            setLoadingItems(false);
          }, 100);

          return;
        }

        // If no valid cache, fetch from API
        const response = await getItemsList({
          page: finalParams.page,
          ordering: finalParams.ordering || "title",
          ...(finalParams.category && { category: finalParams.category }),
          ...(finalParams.search && { search: finalParams.search }),
          ...(finalParams.price_gte && { price_gte: finalParams.price_gte }),
          ...(finalParams.price_lte && { price_lte: finalParams.price_lte }),
          ...(finalParams.slug && { slug: finalParams.slug }),
          ...(finalParams.title && { title: finalParams.title }),
        });

        // Wait a shorter time before updating UI
        await new Promise((resolve) => setTimeout(resolve, 150));

        // Setup state change right away, then loading state change will be in finally block
        if (response) {
          const cacheData = {
            results: response.results || [],
            count: response.count || 0,
          };

          // Cache the results in memory
          cacheRef.current.items[cacheKey] = {
            data: cacheData,
            timestamp: now,
            expiresAt: now + CACHE_EXPIRATION.ITEMS,
          };

          // Cache the results in localStorage
          catalogCache.setItems(cacheKey, cacheData);

          // Directly set items to empty array if results array is empty
          // This ensures the empty state is shown
          setCurrentItems(response.results || []);
          setTotalPages(response.count || 0);

          if (finalParams.slug && catalogs.length > 0) {
            // Try to set current category
            const slugParts = finalParams.slug.split("/");
            let category = null;

            if (slugParts.length === 2) {
              // Find parent category
              const parentCategory = catalogs.find(
                (cat) => cat.slug === slugParts[0]
              );
              if (parentCategory && parentCategory.children) {
                // Find subcategory
                category =
                  Object.values(parentCategory.children).find(
                    (child) => child.slug === slugParts[1]
                  ) || null;
              }
            } else if (slugParts.length === 1) {
              category =
                catalogs.find((cat) => cat.slug === slugParts[0]) || null;
            }

            if (category) {
              setCurrentCategory(category);
            }
          } else if (!finalParams.slug) {
            setCurrentCategory(null);
          }
        } else {
          // Handle case where response is null or undefined
          setCurrentItems([]);
          setTotalPages(0);
        }
      } catch (error) {
        setError("Ошибка при загрузке товаров");
        console.error("Error fetching items:", error);
        // On error, clear the items to show "no items found"
        setCurrentItems([]);
        setTotalPages(0);
      } finally {
        // Always set loading to false after a short delay
        // This ensures transitions between states look smooth
        setTimeout(() => {
          setLoadingItems(false);
        }, 100);
      }
    },
    [currentPage, catalogs]
  );

  // Handle initial loading logic to prevent duplicate requests
  useEffect(() => {
    const initializeData = async () => {
      if (initialLoadRef.current) return;
      initialLoadRef.current = true;

      // Then parse the current URL to determine what to load
      const urlParams = new URLSearchParams(window.location.search);
      const pageParam = urlParams.get("page");
      const page = pageParam ? parseInt(pageParam, 10) : 1;

      // Set current page first
      setCurrentPage(page);

      // Get slug from pathname
      const slug = parseSlugFromPath(window.location.pathname);

      // Fetch items with the correct params
      await fetchItems({
        slug: slug || undefined,
        page,
      });
    };

    initializeData();
  }, [fetchCatalogList, fetchItems]);

  const resetItems = useCallback(() => {
    setCurrentItems([]);
    setCurrentPage(1);
    setTotalPages(0);
  }, []);

  return (
    <CatalogContext.Provider
      value={{
        catalogs,
        currentItems,
        loading,
        loadingItems,
        error,
        currentPage,
        totalPages,
        currentCategory,
        setCurrentPage,
        fetchCatalogList,
        fetchCatalogDetails,
        fetchItems,
        resetItems,
        setCurrentItems,
        setCurrentCategory,
        catalogStructure,
        getCurrentCategoryPath,
        clearCache,
      }}
    >
      {children}
    </CatalogContext.Provider>
  );
};

export const useCatalogContext = () => {
  const context = useContext(CatalogContext);
  if (!context) {
    throw new Error("useCatalogContext must be used within a CatalogProvider");
  }
  return context;
};
