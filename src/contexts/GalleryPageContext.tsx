import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { getOurWorksList } from "/api/api";
import { OurWorks, OurWorksResponse } from "/api/types";

interface GalleryPageContextType {
  ourWorks: OurWorks[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

const GalleryPageContext = createContext<GalleryPageContextType | undefined>(
  undefined
);

export const GalleryPageProvider: React.FC<{
  children: ReactNode;
  initialWorks?: OurWorks[];
}> = ({ children, initialWorks = [] }) => {
  const [ourWorks, setOurWorks] = useState<OurWorks[]>(initialWorks);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchOurWorks = async () => {
    try {
      setLoading(true);
      const response = (await getOurWorksList()) as unknown as OurWorksResponse;

      if (response) {
        setOurWorks(response.results);
        setTotalPages(Math.ceil(response.count / 20));
      }
    } catch (error) {
      console.error("Error fetching works:", error);
      setError("Ошибка при загрузке галереи");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOurWorks();
  }, []);

  return (
    <GalleryPageContext.Provider
      value={{
        ourWorks,
        loading,
        error,
        currentPage,
        totalPages,
        setCurrentPage,
      }}
    >
      {children}
    </GalleryPageContext.Provider>
  );
};

export const useGalleryPageContext = () => {
  const context = useContext(GalleryPageContext);
  if (!context) {
    throw new Error(
      "useGalleryPageContext must be used within a GalleryPageProvider"
    );
  }
  return context;
};
