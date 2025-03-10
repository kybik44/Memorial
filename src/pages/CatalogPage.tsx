import { Box, useMediaQuery } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import catalogBg from "../assets/img/catalogBg.png";
import CustomPagination from "../components/atoms/pagination/CustomPagination";
import Breadcrumbs from "../components/molecules/breadcrumbs/Breadcrumbs";
import CatalogItem from "../components/molecules/catalog-item/CatalogItem";
import CatalogList from "../components/molecules/catalog-list/CatalogList";
import CatalogMenu, {
  CatalogMenuItem,
} from "../components/molecules/catalog-menu/CatalogMenu";
import MobileCatalogMenu from "../components/molecules/catalog-menu/MobileCatalogMenu";
import { theme } from "../core/theme";
import Text from "/components/atoms/text/Text";
import { CatalogProvider, useCatalogContext } from "/contexts/CatalogContext";
import FadeInWhenVisible from "../components/animations/FadeInWhenVisible";
import AnimatedText from "../components/animations/AnimatedText";
import { motion, AnimatePresence } from "framer-motion";

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

const CatalogPageContent = () => {
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

    // Загружаем элементы каталога при первом рендере, если они еще не загружены
    if (items.length === 0 && !loadingItems) {
      fetchItems({ page: 1 });
    }
  }, [
    isMobile,
    catalogs.length,
    fetchCatalogList,
    items.length,
    loadingItems,
    fetchItems,
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
    const handleUrlChanged = (event: Event) => {
      const newPath = window.location.pathname;

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
            // Загружаем данные для подкатегории
            fetchItems({ slug: `${pathParts[1]}/${pathParts[2]}` });
          }
          else if (pathParts.length === 3) {
            fetchItems({ slug: pathParts[1] });
          }

        } else {
          if (pathParts.length > 2) {
            // Это подкатегория
            fetchItems({ slug: `${pathParts[1]}/${pathParts[2]}` });
          } else if (pathParts.length === 2) {
            // Это категория
            fetchItems({ slug: pathParts[1] });
          } else {
            // Это корневой каталог
            fetchItems({ page: 1 });
          }
        }
      }
    };

    // Обработчик для popstate (навигация назад/вперед)
    const handlePopState = () => {
      handleUrlChanged(new Event("urlChanged"));
    };

    // Вызываем обработчик при монтировании компонента
    handleUrlChanged(new Event("urlChanged"));

    window.addEventListener("urlChanged", handleUrlChanged as EventListener);
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener(
        "urlChanged",
        handleUrlChanged as EventListener
      );
      window.removeEventListener("popstate", handlePopState);
    };
  }, [fetchItems, currentPath]);

  const handlePageChange = (page: number) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    setCurrentPage(page);
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
                key={`list-${currentPath}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <CatalogList items={items} loadingItems={loadingItems} />

                {totalPages > 0 && (
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
