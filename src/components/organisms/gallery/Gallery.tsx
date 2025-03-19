import {
  Box,
  Button,
  Container,
  ImageList,
  Theme,
  useMediaQuery,
} from "@mui/material";
import { FC, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GalleryItem from "./GalleryItem";
import styles from "./styles";
import Text from "/components/atoms/text/Text";
import ImageModal from "/components/molecules/ImageModal/ImageModal";
import { useGalleryPageContext } from "/contexts/GalleryPageContext";
import { useMainPageContext } from "/contexts/MainPageContext";
import useGallery from "/hooks/useGallery";
import imageCache from "/services/ImageCache";

// Конфигурация качества изображений для различных типов устройств
const QUALITY_CONFIG = {
  desktop: {
    gridImageWidth: 600, // Размер изображения в сетке для десктопа
    modalImageWidth: 1600, // Размер изображения в модальном окне для десктопа
  },
  mobile: {
    gridImageWidth: 300, // Размер изображения в сетке для мобильных
    modalImageWidth: 800, // Размер изображения в модальном окне для мобильных
  }
};

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

  // Определение текущих размеров на основе устройства
  const imageConfig = isSmallScreen ? QUALITY_CONFIG.mobile : QUALITY_CONFIG.desktop;

  // Memoize the sorting function to avoid unnecessary recalculations
  const getSortedWorks = useCallback(() => {
    if (!works?.length) return [];
    
    return [...works].sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  }, [works]);

  // Memoize the displayed works
  const displayedWorks = useCallback(() => {
    const sortedWorks = getSortedWorks();
    return isMainPage ? sortedWorks.slice(0, 9) : sortedWorks;
  }, [getSortedWorks, isMainPage]);

  // Preload images for better user experience
  useEffect(() => {
    if (!works || loading) return;

    const currentWorks = displayedWorks();
    if (!currentWorks.length) return;

    // Prepare high-quality versions for modal view
    const modalImageUrls = currentWorks.map(work => work.image);
    
    // Prepare optimized grid images
    const gridImageUrls = currentWorks.map(work => {
      // Если есть thumbnail, используем его, иначе используем основное изображение
      return work.thumbnail || work.image;
    });

    // Предварительно загрузить изображения для сетки с высоким приоритетом
    imageCache.preloadBatch(gridImageUrls, true);
    
    // Установить видимые изображения для галереи
    setImages(modalImageUrls);
    
    // Предзагрузить полноразмерные изображения с низким приоритетом
    setTimeout(() => {
      // Отложенная загрузка полноразмерных изображений
      modalImageUrls.forEach(src => {
        imageCache.preload(src, imageConfig.modalImageWidth);
      });
    }, 2000); // Задержка в 2 секунды, чтобы не блокировать основные операции
  }, [displayedWorks, loading, works, setImages, imageConfig.modalImageWidth]);

  const handleViewMore = () => {
    navigate("/gallery", { state: { ourWorks: works } });
  };

  if (loading) {
    return (
      <Container maxWidth="xl" sx={styles.loadingContainer}>
        <Text variant="h4" sx={styles.loadingText}>
          Загрузка галереи...
        </Text>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="xl" sx={styles.errorContainer}>
        <Text variant="h5" color="error">
          {error}
        </Text>
      </Container>
    );
  }

  // Filter out works without images
  const validWorks = displayedWorks().filter(work => !!work.image);

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
            {validWorks.map((item, index) => (
              <GalleryItem
                key={item.id}
                item={item}
                onClick={handleImage}
                index={index}
                optimizedWidth={imageConfig.gridImageWidth}
                priority={index < 6} // Высокий приоритет для первых 6 изображений
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

export default Gallery;
