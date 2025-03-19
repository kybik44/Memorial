import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CloseIcon from "@mui/icons-material/Close";
import { Box, CircularProgress, IconButton, Modal } from "@mui/material";
import { FC, useEffect, useRef, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import { Keyboard, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { styles } from "./styles";
import LazyImage from "/components/atoms/lazy-image/LazyImage";

// Конфигурация качества изображений для различных режимов просмотра
const IMAGE_QUALITY_CONFIG = {
  modal: {
    desktop: 1600, // Полное качество для десктопа
    tablet: 1200, // Среднее качество для планшетов
    mobile: 800, // Низкое качество для мобильных
  },
};

interface NavigationButtonsProps {
  onPrev: () => void;
  onNext: () => void;
  disablePrev?: boolean;
  disableNext?: boolean;
}

const NavigationButtons: FC<NavigationButtonsProps> = ({
  onPrev,
  onNext,
  disablePrev,
  disableNext,
}) => {
  return (
    <>
      <IconButton
        onClick={onPrev}
        sx={styles.prevButton}
        disabled={disablePrev}
        aria-label="Предыдущее изображение"
      >
        <ArrowBackIosNewIcon sx={styles.navigationIcon} />
      </IconButton>
      <IconButton
        onClick={onNext}
        sx={styles.nextButton}
        disabled={disableNext}
        aria-label="Следующее изображение"
      >
        <ArrowForwardIosIcon sx={styles.navigationIcon} />
      </IconButton>
    </>
  );
};

interface ImageModalProps {
  open: boolean;
  currentImageIndex: number;
  loading: boolean;
  images: string[];
  handlePrev: () => void;
  handleNext: () => void;
  handleClose: () => void;
}

const ImageModal: FC<ImageModalProps> = ({
  open,
  currentImageIndex,
  loading,
  images,
  handlePrev,
  handleNext,
  handleClose,
}) => {
  const [swiper, setSwiper] = useState<any>(null);
  const [isImageLoading, setIsImageLoading] = useState<boolean>(true);
  const [viewportWidth, setViewportWidth] = useState<number>(window.innerWidth);
  const swiperInitialized = useRef(false);

  // Определить оптимальный размер изображения на основе viewport
  const getOptimalImageWidth = () => {
    if (viewportWidth > 1280) return IMAGE_QUALITY_CONFIG.modal.desktop;
    if (viewportWidth > 768) return IMAGE_QUALITY_CONFIG.modal.tablet;
    return IMAGE_QUALITY_CONFIG.modal.mobile;
  };

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Безопасно обновляем текущий слайд в Swiper
  useEffect(() => {
    // Проверяем, что swiper существует и инициализирован
    if (
      swiper &&
      swiper.initialized &&
      open &&
      currentImageIndex !== undefined
    ) {
      // Безопасно вызываем slideTo с таймаутом для обеспечения инициализации Swiper
      const timer = setTimeout(() => {
        if (swiper && swiper.initialized) {
          try {
            swiper.slideTo(currentImageIndex, 0);
            swiperInitialized.current = true;
          } catch (error) {
            console.error("Swiper slideTo error:", error);
          }
        }
      }, 50);

      return () => clearTimeout(timer);
    }
  }, [swiper, currentImageIndex, open]);

  // Сбрасываем состояние загрузки при смене изображения
  useEffect(() => {
    setIsImageLoading(true);
  }, [currentImageIndex]);

  const handleImageLoad = () => {
    setIsImageLoading(false);
  };

  // Обработчик инициализации Swiper
  const handleSwiperInit = (swiperInstance: any) => {
    setSwiper(swiperInstance);
    // Устанавливаем начальный слайд после инициализации
    if (swiperInstance && currentImageIndex !== undefined) {
      try {
        swiperInstance.slideTo(currentImageIndex, 0);
        swiperInitialized.current = true;
      } catch (error) {
        console.error("Initial slideTo error:", error);
      }
    }
  };

  return (
    <Modal open={open} onClose={handleClose} sx={styles.modal}>
      <Box sx={styles.modalBox}>
        <IconButton
          onClick={handleClose}
          aria-label="Закрыть"
          sx={styles.closeButton}
        >
          <CloseIcon />
        </IconButton>

        {images.length > 0 && (
          <>
            <NavigationButtons
              onPrev={handlePrev}
              onNext={handleNext}
              disablePrev={currentImageIndex === 0}
              disableNext={currentImageIndex === images.length - 1}
            />

            <Swiper
              onSwiper={handleSwiperInit}
              slidesPerView={1}
              initialSlide={currentImageIndex}
              onSlideChange={(swiperInstance) => {
                if (
                  swiperInstance &&
                  currentImageIndex !== swiperInstance.activeIndex
                ) {
                  if (swiperInstance.activeIndex > currentImageIndex) {
                    handleNext();
                  } else {
                    handlePrev();
                  }
                }
              }}
              modules={[Navigation, Keyboard]}
              keyboard={{ enabled: true }}
              style={{ width: "100%", height: "100%" }}
            >
              {images.map((image, index) => (
                <SwiperSlide
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Box sx={styles.imageContainer}>
                    {(loading || isImageLoading) && (
                      <Box sx={styles.loader}>
                        <CircularProgress />
                      </Box>
                    )}

                    <LazyImage
                      src={image}
                      alt={`Изображение ${index + 1}`}
                      width={getOptimalImageWidth()}
                      quality="high"
                      priority={index === currentImageIndex}
                      preload={index === currentImageIndex}
                      onLoad={handleImageLoad}
                      style={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        objectFit: "contain",
                        opacity: loading || isImageLoading ? 0 : 1,
                        transition: "opacity 0.5s ease-in-out",
                      }}
                    />
                  </Box>
                </SwiperSlide>
              ))}
            </Swiper>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default ImageModal;
