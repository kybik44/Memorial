import { Box, Container, Theme, useMediaQuery } from "@mui/material";
import { useLocation } from "react-router-dom";
import CustomPagination from "../components/atoms/pagination/CustomPagination";
import GalleryBreadcrumbs from "../components/molecules/breadcrumbs/GalleryBreadcrumbs";
import Text from "/components/atoms/text/Text";
import Gallery from "/components/organisms/gallery/Gallery";
import {
  GalleryPageProvider,
  useGalleryPageContext,
} from "/contexts/GalleryPageContext";
import { theme } from "/core/theme";

const initStyles = {
  container: {
    width: "100%",
    minHeight: "100vh",
    [theme.breakpoints.down("sm")]: {
      minHeight: "100%",
    },
  },
};

const GalleryContent = () => {
  const { ourWorks, loading, error, currentPage, totalPages, setCurrentPage } =
    useGalleryPageContext();

  const handlePageChange = (page: number) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setCurrentPage(page);
  };

  if (loading) return <Text>Загрузка...</Text>;
  if (error)
    return (
      <Text variant="h5" color="error">
        {error}
      </Text>
    );

  return (
    <>
      <Gallery />
      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: 4 }}>
          <CustomPagination
            totalItems={totalPages * 20}
            itemsPerPage={20}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </Box>
      )}
    </>
  );
};

const GalleryPage = () => {
  const location = useLocation();
  const initialWorks = location.state?.ourWorks || [];

  return (
    <GalleryPageProvider initialWorks={initialWorks}>
      <Box sx={initStyles.container}>
        <GalleryBreadcrumbs />
        <Container maxWidth="xl" sx={{ paddingBottom: "40px" }}>
          <GalleryContent />
        </Container>
      </Box>
    </GalleryPageProvider>
  );
};

export default GalleryPage;
