import {
  Box,
  Button,
  Container,
  ImageList,
  Theme,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import GalleryItem from "./GalleryItem";
import styles from "./styles";
import Text from "/components/atoms/text/Text";
import ImageModal from "/components/molecules/ImageModal/ImageModal";
import useGallery from "/hooks/useGallery";
import { useGalleryPageContext } from "/contexts/GalleryPageContext";
import { useMainPageContext } from "/contexts/MainPageContext";
import { useEffect } from "react";
import { api } from "/api/api";

const Gallery = ({ isMainPage = false }) => {
  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );
  const navigate = useNavigate();

  const galleryContext = isMainPage
    ? useMainPageContext()
    : useGalleryPageContext();
  const { ourWorks, loading, error } = galleryContext;

  const {
    open,
    currentImageIndex,
    loading: modalLoading,
    images,
    setImages,
    handleImage,
    handlePrev,
    handleNext,
    handleClose,
  } = useGallery();

  useEffect(() => {
    if (ourWorks.length > 0) {
      setImages(ourWorks.map((work) => `${api.defaults.baseURL}${work.image}`));
    }
  }, [ourWorks, setImages]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ErrorScreen message={error} />;
  }

  const displayedWorks = isMainPage ? ourWorks.slice(0, 12) : ourWorks;

  const handleViewMore = () => {
    navigate("/gallery");
  };

  return (
    <>
      <Box sx={styles.container}>
        <Container maxWidth="xl" sx={styles.content}>
          <Text
            variant={isSmallScreen ? "h2" : "h1"}
            multiline
            sx={styles.title}
          >
            Наши работы
          </Text>
          <ImageList
            sx={styles.imageList}
            variant="quilted"
            cols={!isSmallScreen ? 6 : 4}
            rowHeight={!isSmallScreen ? 250 : 100}
            gap={!isSmallScreen ? 40 : 10}
          >
            {displayedWorks.map((item, index) => (
              <GalleryItem
                key={item.id}
                item={{ id: item.id, img: item.image, title: "" }}
                onClick={handleImage}
                index={index}
              />
            ))}
          </ImageList>
          {isMainPage && (
            <Button size="small" sx={styles.button} onClick={handleViewMore}>
              Посмотреть больше работ
            </Button>
          )}
        </Container>
      </Box>
      <ImageModal
        open={open}
        currentImageIndex={currentImageIndex}
        loading={modalLoading}
        images={images}
        handlePrev={handlePrev}
        handleNext={handleNext}
        handleClose={handleClose}
      />
    </>
  );
};

const LoadingScreen = () => (
  <Box sx={styles.container}>
    <Container maxWidth="xl" sx={styles.content}>
      <Text variant="h4">Loading...</Text>
    </Container>
  </Box>
);

const ErrorScreen = ({ message }) => (
  <Box sx={styles.container}>
    <Container maxWidth="xl" sx={styles.content}>
      <Text variant="h4" color="error">
        {message}
      </Text>
    </Container>
  </Box>
);

export default Gallery;
