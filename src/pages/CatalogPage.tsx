import { Box, useMediaQuery } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState, useMemo } from "react";
import catalogBg from "../assets/img/catalogBg.png";
import AnimatedText from "../components/animations/AnimatedText";
import CustomPagination from "../components/atoms/pagination/CustomPagination";
import Breadcrumbs from "../components/molecules/breadcrumbs/Breadcrumbs";
import CatalogItem from "../components/molecules/catalog-item/CatalogItem";
import CatalogList from "../components/molecules/catalog-list/CatalogList";
import CatalogMenu, {
  CatalogMenuItem,
} from "../components/molecules/catalog-menu/CatalogMenu";
import MobileCatalogMenu from "../components/molecules/catalog-menu/MobileCatalogMenu";
import { theme } from "../core/theme";
import { CatalogProvider, useCatalogContext } from "/contexts/CatalogContext";

const styles = {
  container: {
    width: "100%",
    minHeight: "100vh",
    backgroundImage: `url("${catalogBg}")`,
    backgroundPosition: "top",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    [theme.breakpoints.down("sm")]: {
      minHeight: "100%",
    },
  },
  wrapper: {
    display: "flex",
    justifyContent: "flex-start",
    gap: "20px",
    position: "relative",
  },
};

const CatalogPage = () => {
  return (
    <CatalogProvider>
      <CatalogPageContent />
    </CatalogProvider>
  );
};

const CatalogPageContent: React.FC = () => {
  const {
    catalogs,
    currentItems: items,
    loadingItems,
    error,
    currentPage,
    totalPages,
    setCurrentPage,
    fetchCatalogList,
    fetchItems,
    setCurrentCategory,
  } = useCatalogContext();

  const [linksList, setLinksList] = useState<CatalogMenuItem[]>([]);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("md")
  );

  // Получаем параметры из текущего пути
  const getPathParams = useCallback(() => {
    const pathParts = currentPath.split("/").filter(Boolean);
    if (pathParts[0] === "catalog") {
      // Определяем, является ли последняя часть пути числом (ID товара)
      const lastPart = pathParts[pathParts.length - 1];
      const isLastPartNumeric = !isNaN(Number(lastPart));

      // Если последняя часть - число, это ID товара
      if (isLastPartNumeric) {
        // Для вложенных категорий (например, /catalog/pamyatniki/dvojnye-pamyatniki/111)
        if (pathParts.length > 3) {
          return {
            section: pathParts[1],
            subsectionOrId: pathParts[2],
            productId: lastPart,
            isProduct: true,
          };
        }
        // Для категорий первого уровня (например, /catalog/pamyatniki/111)
        else if (pathParts.length === 3) {
          return {
            section: pathParts[1],
            subsectionOrId: lastPart,
            productId: undefined,
            isProduct: true,
          };
        }
        // Для корневого каталога (например, /catalog/111)
        else if (pathParts.length === 2) {
          return {
            section: undefined,
            subsectionOrId: lastPart,
            productId: undefined,
            isProduct: true,
          };
        }
      }

      // Если последняя часть не число, это категория или подкатегория
      return {
        section: pathParts[1],
        subsectionOrId: pathParts.length > 2 ? pathParts[2] : undefined,
        productId: pathParts.length > 3 ? pathParts[3] : undefined,
        isProduct: false,
      };
    }

    return {
      section: undefined,
      subsectionOrId: undefined,
      productId: undefined,
      isProduct: false,
    };
  }, [currentPath]);

  useEffect(() => {
    if (catalogs.length === 0) {
      fetchCatalogList();
    }

    // Parse current path to determine the slug and page
    const path = window.location.pathname;
    const searchParams = new URLSearchParams(window.location.search);
    const pageParam = searchParams.get('page');
    const page = pageParam ? parseInt(pageParam, 10) : 1;
    
    const pathParts = path.split("/").filter(Boolean);
    
    // Only load items on initial render if they aren't already loading/loaded
    if (items.length === 0 && !loadingItems) {
      if (pathParts[0] === "catalog") {
        if (pathParts.length > 1) {
          // We have a category/subcategory in the URL
          const lastPart = pathParts[pathParts.length - 1];
          const isLastPartNumeric = !isNaN(Number(lastPart));
          
          if (isLastPartNumeric) {
            // This is a product detail page, no need to load category items
            // The CatalogItem component will handle loading the product
          } else if (pathParts.length > 2) {
            // This is a subcategory (e.g., /catalog/section/subsection)
            const slug = `${pathParts[1]}/${pathParts[2]}`;
            fetchItems({ slug, page });
            setCurrentPage(page);
            
            // Try to set the current category if catalog data is available
            if (catalogs.length > 0) {
              const category = catalogs.find(cat => 
                cat.slug === pathParts[1] && 
                cat.children && 
                Object.values(cat.children).some(child => child.slug === pathParts[2])
              );
              if (category) {
                const subcategory = Object.values(category.children).find(child => 
                  child.slug === pathParts[2]
                );
                if (subcategory) {
                  setCurrentCategory(subcategory);
                }
              }
            }
          } else {
            // This is a main category (e.g., /catalog/section)
            fetchItems({ slug: pathParts[1], page });
            setCurrentPage(page);
            
            // Try to set the current category
            if (catalogs.length > 0) {
              const category = catalogs.find(cat => cat.slug === pathParts[1]);
              if (category) {
                setCurrentCategory(category);
              }
            }
          }
        } else {
          // This is the root catalog page
          fetchItems({ page });
          setCurrentPage(page);
        }
      }
    }
  }, [
    isMobile,
    catalogs,
    fetchCatalogList,
    items.length,
    loadingItems,
    fetchItems,
    setCurrentPage,
    setCurrentCategory,
  ]);

  useEffect(() => {
    if (catalogs.length > 0) {
      const formattedLinksList = catalogs.map((category) => ({
        title: category.title,
        section: category.slug,
        links: Object.values(category.children).map((child) => ({
          title: child.title,
          to: child.slug,
        })),
      }));
      setLinksList(formattedLinksList);
    }
  }, [catalogs]);

  // Обработчик изменения URL без перезагрузки страницы
  useEffect(() => {
    const handleUrlChanged = () => {
      const newPath = window.location.pathname;
      const searchParams = new URLSearchParams(window.location.search);
      const pageParam = searchParams.get('page');
      const page = pageParam ? parseInt(pageParam, 10) : 1;

      // Если путь не изменился, ничего не делаем
      if (newPath === currentPath) {
        return;
      }

      // Обновляем текущий путь
      setCurrentPath(newPath);

      // Разбираем путь для определения параметров
      const pathParts = newPath.split("/").filter(Boolean);
      if (pathParts[0] === "catalog") {
        // Проверяем, является ли последняя часть пути числом (ID товара)
        const lastPart = pathParts[pathParts.length - 1];
        const isLastPartNumeric = !isNaN(Number(lastPart));

        // Если последняя часть - число, это ID товара
        if (isLastPartNumeric) {
          // Для вложенных категорий (например, /catalog/pamyatniki/dvojnye-pamyatniki/111)
          if (pathParts.length > 3) {
            // Формируем slug для категории
            const categorySlug = `${pathParts[1]}/${pathParts[2]}`;
            // Загружаем данные для подкатегории
            fetchItems({ slug: categorySlug });
            
            // Если у нас есть структура каталога, устанавливаем текущую категорию
            if (catalogs.length > 0) {
              const category = catalogs.find(cat => 
                cat.slug === pathParts[1] && 
                cat.children && 
                Object.values(cat.children).some(child => child.slug === pathParts[2])
              );
              if (category) {
                const subcategory = Object.values(category.children).find(child => 
                  child.slug === pathParts[2]
                );
                if (subcategory) {
                  setCurrentCategory(subcategory);
                }
              }
            }
          } else if (pathParts.length === 3) {
            // Для категорий первого уровня (например, /catalog/pamyatniki/111)
            fetchItems({ slug: pathParts[1] });
            
            // Устанавливаем текущую категорию
            if (catalogs.length > 0) {
              const category = catalogs.find(cat => cat.slug === pathParts[1]);
              if (category) {
                setCurrentCategory(category);
              }
            }
          }
        } else {
          if (pathParts.length > 2) {
            // Это подкатегория
            const categorySlug = `${pathParts[1]}/${pathParts[2]}`;
            fetchItems({ slug: categorySlug, page });
            setCurrentPage(page);
            
            // Устанавливаем текущую категорию
            if (catalogs.length > 0) {
              const category = catalogs.find(cat => 
                cat.slug === pathParts[1] && 
                cat.children && 
                Object.values(cat.children).some(child => child.slug === pathParts[2])
              );
              if (category) {
                const subcategory = Object.values(category.children).find(child => 
                  child.slug === pathParts[2]
                );
                if (subcategory) {
                  setCurrentCategory(subcategory);
                }
              }
            }
          } else if (pathParts.length === 2) {
            // Это категория
            fetchItems({ slug: pathParts[1], page });
            setCurrentPage(page);
            
            // Устанавливаем текущую категорию
            if (catalogs.length > 0) {
              const category = catalogs.find(cat => cat.slug === pathParts[1]);
              if (category) {
                setCurrentCategory(category);
              }
            }
          } else {
            // Это корневой каталог
            fetchItems({ page });
            setCurrentPage(page);
            setCurrentCategory(null);
          }
        }
      }
    };

    // Обработчик для popstate (навигация назад/вперед)
    const handlePopState = () => {
      handleUrlChanged();
    };

    // Вызываем обработчик при монтировании компонента
    handleUrlChanged();

    window.addEventListener("urlChanged", handleUrlChanged as EventListener);
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener(
        "urlChanged",
        handleUrlChanged as EventListener
      );
      window.removeEventListener("popstate", handlePopState);
    };
  }, [catalogs, fetchItems, currentPath, setCurrentCategory, setCurrentPage]);

  const handlePageChange = (page: number) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    // Get the current path parameters to maintain category context when changing pages
    const { section, subsectionOrId } = getPathParams();
    
    // Construct the URL with the page query parameter
    let url = window.location.pathname;
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('page', page.toString());
    url = `${url}?${searchParams.toString()}`;
    
    // Update the URL without full page reload
    window.history.replaceState({ path: url }, "", url);
    
    // If we're in a category or subcategory (not viewing a product), pass the slug
    if (!getPathParams().isProduct && (section || subsectionOrId)) {
      // Construct the slug based on available path parameters
      let slug = section || '';
      if (subsectionOrId && !isNaN(Number(subsectionOrId))) {
        // If subsectionOrId is a number, it's a product ID, not a slug part
        // Don't include it in the slug
      } else if (subsectionOrId) {
        // It's a subcategory
        slug = `${section}/${subsectionOrId}`;
      }
      
      // Only fetch with slug if we have a valid slug
      if (slug) {
        fetchItems({ slug, page });
        setCurrentPage(page); // Update the currentPage state
      } else {
        setCurrentPage(page);
      }
    } else {
      // If we're not in a category view, just set the page number
      fetchItems({ page });
      setCurrentPage(page);
    }

    // Trigger URL change event to update components
    const event = new CustomEvent("urlChanged", { detail: { path: url } });
    window.dispatchEvent(event);
  };

  // Получаем ID продукта, убедившись, что он не undefined
  const getProductId = (): string => {
    const pathParts = currentPath.split("/").filter(Boolean);
    // Если последняя часть пути - число, это ID товара
    const lastPart = pathParts[pathParts.length - 1];
    if (!isNaN(Number(lastPart))) {
      return lastPart;
    }

    // Для совместимости со старой логикой
    const { productId, subsectionOrId } = getPathParams();
    if (productId) return productId;
    if (subsectionOrId && !isNaN(Number(subsectionOrId))) return subsectionOrId;

    return "";
  };

  // Use a more stable key generator for the views
  const viewKey = useMemo(() => {
    const isProduct = getPathParams().isProduct;
    const id = getProductId();
    const page = currentPage;
    const path = window.location.pathname;
    
    if (isProduct) {
      return `product-${id}`;
    }
    
    return `list-${path}-page-${page}`;
  }, [currentPath, currentPage]);

  if (error) {
    return (
      <Box sx={styles.container}>
        <AnimatedText variant="h5" color="error" animationType="fadeIn">
          {error}
        </AnimatedText>
      </Box>
    );
  }

  return (
    <Box sx={styles.container}>
      <Breadcrumbs />

      <Box sx={styles.wrapper}>
        {!isMobile ? (
          <CatalogMenu links={linksList} />
        ) : (
          <MobileCatalogMenu links={linksList} />
        )}

        <Box
          sx={{
            width: "100%",
            position: "relative",
            minHeight: "300px",
          }}
        >
          <AnimatePresence mode="wait">
            {getPathParams().isProduct ? (
              <motion.div
                key={`product-${getProductId()}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <CatalogItem productId={getProductId()} />
              </motion.div>
            ) : (
              <motion.div
                key={viewKey}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <CatalogList items={items} loadingItems={loadingItems} />

                {!loadingItems && totalPages > 0 && (
                  <Box mt={4}>
                    <CustomPagination
                      totalItems={totalPages}
                      itemsPerPage={20}
                      currentPage={currentPage}
                      onPageChange={handlePageChange}
                    />
                  </Box>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </Box>
      </Box>
    </Box>
  );
};

export default CatalogPage;
