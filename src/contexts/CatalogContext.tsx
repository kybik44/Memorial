import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { getCatalogDetails, getCatalogList, getItemsList } from "/api/api";
import { Catalog, CatalogListItem, ItemsListParams } from "/api/types";

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
  fetchCatalogList: () => Promise<void>;
  fetchCatalogDetails: (slug: string) => Promise<Catalog | undefined>;
  fetchItems: (params?: ItemsListParams) => Promise<void>;
  resetItems: () => void;
  setCurrentItems: (items: CatalogListItem[]) => void;
  setCurrentCategory: (category: Catalog | null) => void;
  catalogStructure: Record<string, Catalog>;
  getCurrentCategoryPath: (slug: string) => Catalog[];
}

const CatalogContext = createContext<CatalogContextType | undefined>(undefined);

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
      const response = await getCatalogList();
      if (response) {
        setCatalogs(response.results);
        buildCatalogStructure(response.results);
      }
    } catch (error) {
      setError("Ошибка при загрузке каталога");
      console.error("Error fetching catalog:", error);
    } finally {
      setLoading(false);
    }
  }, [buildCatalogStructure]);

  const fetchCatalogDetails = useCallback(async (slug: string) => {
    try {
      const details = await getCatalogDetails(slug);
      return details;
    } catch (error) {
      console.error("Error fetching catalog details:", error);
      return undefined;
    }
  }, []);

  const fetchItems = useCallback(
    async (params?: ItemsListParams) => {
      try {
        setLoadingItems(true);
        const response = await getItemsList({
          page: params?.page || currentPage,
          ordering: params?.ordering || "title",
          ...(params?.category && { category: params.category }),
          ...(params?.search && { search: params.search }),
          ...(params?.price_gte && { price_gte: params.price_gte }),
          ...(params?.price_lte && { price_lte: params.price_lte }),
          ...(params?.slug && { slug: params.slug }),
          ...(params?.title && { title: params.title }),
        });

        if (response) {
          setCurrentItems(response.results);
          setTotalPages(response.count);
          if (!params?.slug) {
            setCurrentCategory(null);
          }
        }
      } catch (error) {
        setError("Ошибка при загрузке товаров");
        console.error("Error fetching items:", error);
      } finally {
        setTimeout(() => {
          setLoadingItems(false);
        }, 300);
      }
    },
    [currentPage]
  );

  useEffect(() => {
    if (currentCategory) {
      fetchItems({ slug: currentCategory.full_slug, page: currentPage });
    } else {
      fetchItems({ page: currentPage });
    }
  }, [currentPage, currentCategory, fetchItems]);

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
