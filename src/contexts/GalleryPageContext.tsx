import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { getOurWorksList } from "/api/api";
import { OurWorks } from "/api/types";

interface GalleryPageContextType {
  ourWorks: OurWorks[];
  loading: boolean;
  error: string | null;
  setOurWorks: (works: OurWorks[]) => void;
}

const GalleryPageContext = createContext<GalleryPageContextType | undefined>(
  undefined
);

export const GalleryPageProvider: React.FC<{
  children: ReactNode;
  initialWorks?: OurWorks[];
}> = ({ children, initialWorks = [] }) => {
  const [ourWorks, setOurWorks] = useState<OurWorks[]>(initialWorks);
  const [loading, setLoading] = useState<boolean>(initialWorks.length === 0);
  const [error, setError] = useState<string | null>(null);

  const fetchOurWorks = async () => {
    if (initialWorks.length === 0) {
      setLoading(true);
      try {
        const result = await getOurWorksList();
        if (result) {
          setOurWorks(result);
        }
      } catch (error) {
        setError("Error fetching our works.");
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchOurWorks();
  }, []);

  return (
    <GalleryPageContext.Provider
      value={{ ourWorks, loading, error, setOurWorks }}
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
