import {
  Box,
  Button,
  Container,
  ImageList,
  Theme,
  useMediaQuery,
} from "@mui/material";
import { FC, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import GalleryItem from "./GalleryItem";
import styles from "./styles";
import Text from "/components/atoms/text/Text";
import ImageModal from "/components/molecules/ImageModal/ImageModal";
import { useGalleryPageContext } from "/contexts/GalleryPageContext";
import { useMainPageContext } from "/contexts/MainPageContext";
import useGallery from "/hooks/useGallery";

interface GalleryProps {
  isMainPage?: boolean;
}

const Gallery: FC<GalleryProps> = ({ isMainPage = false }) => {
  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );
  const navigate = useNavigate();

  // Получаем данные из соответствующего контекста
  const mainPageContext = isMainPage ? useMainPageContext() : null;
  const galleryContext = isMainPage ? null : useGalleryPageContext();

  // Используем данные в зависимости от страницы
  const works = isMainPage
    ? mainPageContext?.mainPageData?.our_works
    : galleryContext?.ourWorks;
  const loading = isMainPage
    ? !mainPageContext?.mainPageData
    : galleryContext?.loading;
  const error = isMainPage ? mainPageContext?.error : galleryContext?.error;

  // Use a ref to store the previous works to avoid unnecessary updates
  const prevWorksRef = useRef<typeof works>([]);

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

  // Memoize the sorting function to avoid unnecessary recalculations
  const getSortedWorks = useCallback(() => {
    if (!works?.length) return [];
    
    return [...works].sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  }, [works]);

  // Memoize the displayed works
  const getDisplayedWorks = useCallback(() => {
    const sortedWorks = getSortedWorks();
    return isMainPage ? sortedWorks.slice(0, 10) : sortedWorks;
  }, [getSortedWorks, isMainPage]);

  // Update images only when works change
  useEffect(() => {
    // Skip if works haven't changed
    if (
      JSON.stringify(prevWorksRef.current) === JSON.stringify(works) ||
      !works?.length
    ) {
      return;
    }
    
    prevWorksRef.current = works;
    const displayedWorks = getDisplayedWorks();
    
    if (displayedWorks.length > 0) {
      const imageUrls = displayedWorks.map((work) => work.image);
      setImages(imageUrls);
    }
  }, [works, getDisplayedWorks, setImages]);

  const handleViewMore = useCallback(() => {
    navigate("/gallery", { state: { ourWorks: works } });
  }, [navigate, works]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ErrorScreen message={error} />;
  }

  const displayedWorks = getDisplayedWorks();

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
            {displayedWorks?.map((item, index) => (
              <GalleryItem
                key={item.id}
                item={item}
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

const ErrorScreen = ({ message }: { message: string }) => (
  <Box sx={styles.container}>
    <Container maxWidth="xl" sx={styles.content}>
      <Text variant="h4" color="error">
        {message}
      </Text>
    </Container>
  </Box>
);

export default Gallery;
