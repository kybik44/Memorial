import { Box, CircularProgress, useMediaQuery } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { useEffect, useState } from "react";
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
  const { subsectionOrId, productId } = useParams();
  const {
    catalogs,
    currentItems: items,
    loadingItems,
    error,
    currentPage,
    totalPages,
    setCurrentPage,
    fetchCatalogList,
  } = useCatalogContext();

  const [linksList, setLinksList] = useState<CatalogMenuItem[]>([]);
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("md")
  );

  useEffect(() => {
    if (catalogs.length === 0) {
      fetchCatalogList();
    }
  }, [isMobile, catalogs.length, fetchCatalogList]);

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

  const handlePageChange = (page: number) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    setCurrentPage(page);
  };

  if (error) {
    return (
      <Box sx={styles.container}>
        <Text variant="h5" color="error">
          {error}
        </Text>
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
            transition: "opacity 0.3s ease",
          }}
        >
          {loadingItems ? (
            <Box
              position="absolute"
              top={0}
              left={0}
              right={0}
              bottom={0}
              display="flex"
              alignItems="center"
              justifyContent="center"
              zIndex={1}
            >
              <CircularProgress />
            </Box>
          ) : null}
          {productId || (subsectionOrId && !isNaN(Number(subsectionOrId))) ? (
            <CatalogItem productId={productId || subsectionOrId} />
          ) : (
            <>
              <CatalogList items={items} loadingItems={loadingItems} />
              {totalPages > 0 && (
                <CustomPagination
                  totalItems={totalPages}
                  itemsPerPage={20}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default CatalogPage;
