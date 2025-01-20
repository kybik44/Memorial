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
  catalogs: Catalog[];
  ourWorks: OurWorks[];
  kindsCatalog: Catalog[];
  fencesCatalog: Catalog[];
  decorCatalog: Catalog[];
  loading: boolean;
  loadingMaterials: boolean;
  loadingCatalogs: boolean;
  loadingOurWorks: boolean;
  error: string | null;
  refreshData: () => void;
  fetchMaterials: () => void;
  fetchCatalogs: () => void;
  fetchOurWorks: () => void;
}

const MainPageContext = createContext<MainPageContextType | undefined>(
  undefined
);

export const MainPageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [mainPageData, setMainPageData] = useState<IMainPage | undefined>(
    undefined
  );
  const [materials, setMaterials] = useState<Material[]>([]);
  const [catalogs, setCatalogs] = useState<Catalog[]>([]);
  const [ourWorks, setOurWorks] = useState<OurWorks[]>([]);
  const [kindsCatalog, setKindsCatalog] = useState<Catalog[]>([]);
  const [fencesCatalog, setFencesCatalog] = useState<Catalog[]>([]);
  const [decorCatalog, setDecorCatalog] = useState<Catalog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMaterials, setLoadingMaterials] = useState<boolean>(true);
  const [loadingCatalogs, setLoadingCatalogs] = useState<boolean>(true);
  const [loadingOurWorks, setLoadingOurWorks] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getMainPageData();
      setMainPageData(data);
    } catch (error) {
      setError("Error fetching main page data.");
    } finally {
      setLoading(false);
    }
  };

  const fetchMaterials = async () => {
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
  };

  const fetchCatalogs = async () => {
    setLoadingCatalogs(true);
    try {
      const result = await getCatalogList();
      console.log("Fetched catalogs:", result); // Добавляем логирование
      if (result && Array.isArray(result)) {
        setCatalogs(result);

        const kindsData = result.find((c) => c.slug === "pamyatniki");
        console.log("Kinds Data:", kindsData); // Логирование kindsData

        const fencesData = result.find(
          (c) => c.slug === "blagoustrojstvo-i-ogrady"
        );
        console.log("Fences Data:", fencesData); // Логирование fencesData

        const decorData = result.find((c) => c.slug === "oformlenie-i-dekor");
        console.log("Decor Data:", decorData); // Логирование decorData

        setKindsCatalog(kindsData ? kindsData.children : []);
        setFencesCatalog(fencesData ? fencesData.children : []);
        setDecorCatalog(decorData ? decorData.children : []);
      }
    } catch (error) {
      console.error("Error fetching catalogs:", error);
      setError("Error fetching catalogs.");
    } finally {
      setLoadingCatalogs(false);
    }
  };

  const fetchOurWorks = async () => {
    setLoadingOurWorks(true);
    try {
      const result = await getOurWorksList();
      if (result) {
        setOurWorks(result);
      }
    } catch (error) {
      setError("Error fetching our works.");
    } finally {
      setLoadingOurWorks(false);
    }
  };

  useEffect(() => {
    fetchData();
    fetchMaterials();
    fetchCatalogs();
    fetchOurWorks(); // Fetch our works data on mount
  }, []);

  return (
    <MainPageContext.Provider
      value={{
        mainPageData,
        materials,
        catalogs,
        ourWorks,
        kindsCatalog,
        fencesCatalog,
        decorCatalog,
        loading,
        loadingMaterials,
        loadingCatalogs,
        loadingOurWorks,
        error,
        refreshData: fetchData,
        fetchMaterials,
        fetchCatalogs,
        fetchOurWorks,
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
