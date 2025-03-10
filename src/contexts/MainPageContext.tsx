import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  getMainPageData,
  getMaterialsList,
  getCatalogList,
  getOurWorksList,
} from "/api/api";
import { MainPage as IMainPage, Material, Catalog, OurWorks } from "/api/types";

interface MainPageContextType {
  mainPageData: IMainPage | undefined;
  materials: Material[];
  kindsCatalog: Catalog[];
  fencesCatalog: Catalog[];
  decorCatalog: Catalog[];
  loading: boolean;
  loadingMaterials: boolean;
  error: string | null;
  refreshData: () => void;
  fetchMaterials: () => void;
  catalogSections: CatalogSection[];
}

const MainPageContext = createContext<MainPageContextType | undefined>(
  undefined
);

interface CatalogSection {
  id: number;
  catalog: Catalog[];
  title: string;
  carousel: boolean;
  position: number;
  created_at: string;
  updated_at: string;
}

export const MainPageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [mainPageData, setMainPageData] = useState<IMainPage | undefined>(
    undefined
  );
  const [materials, setMaterials] = useState<Material[]>([]);
  const [kindsCatalog, setKindsCatalog] = useState<Catalog[]>([]);
  const [fencesCatalog, setFencesCatalog] = useState<Catalog[]>([]);
  const [decorCatalog, setDecorCatalog] = useState<Catalog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMaterials, setLoadingMaterials] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [catalogSections, setCatalogSections] = useState<CatalogSection[]>([]);

  const fetchData = async () => {
    if (!mainPageData) {
      setLoading(true);
      try {
        const data = await getMainPageData();
        if (data) {
          setMainPageData(data);
          const sortedSections = [...data.catalogs].sort((a, b) => a.position - b.position);
          setCatalogSections(sortedSections);
          
          sortedSections.forEach(section => {
            if (section.carousel) {
              setDecorCatalog(section.catalog);
            } else {
              switch (section.position) {
                case 1:
                  setKindsCatalog(section.catalog);
                  break;
                case 3:
                  setFencesCatalog(section.catalog);
                  break;
              }
            }
          });
        }
      } catch (error) {
        setError("Error fetching main page data.");
      } finally {
        setLoading(false);
      }
    }
  };

  const fetchMaterials = async () => {
    if (materials.length === 0) {
      setLoadingMaterials(true);
      try {
        const result = await getMaterialsList(1);
        if (result) {
          setMaterials(result.results);
        }
      } catch (error) {
        setError("Error fetching materials.");
      } finally {
        setLoadingMaterials(false);
      }
    }
  };

  useEffect(() => {
    fetchData();
    fetchMaterials();
  }, []);

  return (
    <MainPageContext.Provider
      value={{
        mainPageData,
        materials,
        kindsCatalog,
        fencesCatalog,
        decorCatalog,
        loading,
        loadingMaterials,
        error,
        refreshData: fetchData,
        fetchMaterials,
        catalogSections,
      }}
    >
      {children}
    </MainPageContext.Provider>
  );
};

export const useMainPageContext = () => {
  const context = useContext(MainPageContext);
  if (!context) {
    throw new Error(
      "useMainPageContext must be used within a MainPageProvider"
    );
  }
  return context;
};
