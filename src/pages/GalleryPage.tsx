import { Box, Container } from "@mui/material";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import AnimatedText from "../components/animations/AnimatedText";
import FadeInWhenVisible from "../components/animations/FadeInWhenVisible";
import CustomPagination from "../components/atoms/pagination/CustomPagination";
import GalleryBreadcrumbs from "../components/molecules/breadcrumbs/GalleryBreadcrumbs";
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
  galleryHeader: {
    textAlign: "center",
    marginBottom: "2rem",
    position: "relative",
    "&::after": {
      content: '""',
      position: "absolute",
      bottom: "-10px",
      left: "50%",
      transform: "translateX(-50%)",
      width: "80px",
      height: "3px",
      background: "linear-gradient(90deg, #6E8061, #8A9C7E)",
      borderRadius: "2px",
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

  if (loading) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        py={8}
      >
        <AnimatedText variant="h4" mb={4} animationType="fadeIn">
          Загрузка галереи...
        </AnimatedText>
      </Box>
    );
  }

  if (error) {
    return (
      <AnimatedText variant="h5" color="error" animationType="fadeIn">
        {error}
      </AnimatedText>
    );
  }

  return (
    <>
      <Box sx={initStyles.galleryHeader}>
        <AnimatedText variant="h3" animationType="highlight" mb={1}>
          Наши работы
        </AnimatedText>
        <AnimatedText variant="body1" animationType="fadeIn" delay={0.3}>
          Примеры наших лучших проектов и реализаций
        </AnimatedText>
      </Box>

      <FadeInWhenVisible>
        <Gallery />
      </FadeInWhenVisible>

      {totalPages > 1 && (
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          sx={{ display: "flex", justifyContent: "center", mt: 4, mb: 4 }}
        >
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
      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        sx={initStyles.container}
      >
        <FadeInWhenVisible duration={0.4}>
          <GalleryBreadcrumbs />
        </FadeInWhenVisible>

        <Container maxWidth="xl" sx={{ paddingBottom: "40px" }}>
          <GalleryContent />
        </Container>
      </Box>
    </GalleryPageProvider>
  );
};

export default GalleryPage;
