import {
  Box,
  CircularProgress,
  Fade,
  Modal,
  Theme,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CloseIcon from "@mui/icons-material/Close";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Keyboard } from "swiper/modules";
import { useSwiper } from 'swiper/react';
import "swiper/css";
import "swiper/css/navigation";
import styles from "./styles";

// Компонент для кастомных кнопок навигации
const NavigationButtons = () => {
  const swiper = useSwiper();
  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );

  if (isSmallScreen) return null;

  return (
    <>
      <IconButton
        onClick={() => swiper.slidePrev()}
        sx={{
          position: 'absolute',
          left: { xs: 8, sm: 16, md: 24 },
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 2,
          color: 'white',
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
          },
        }}
      >
        <ArrowBackIosNewIcon />
      </IconButton>
      <IconButton
        onClick={() => swiper.slideNext()}
        sx={{
          position: 'absolute',
          right: { xs: 8, sm: 16, md: 24 },
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 2,
          color: 'white',
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
          },
        }}
      >
        <ArrowForwardIosIcon />
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

const ImageModal: React.FC<ImageModalProps> = ({
  open,
  currentImageIndex,
  loading,
  images,
  handlePrev,
  handleNext,
  handleClose,
}) => {
  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={styles.modalBox}>
        <Fade in={open} timeout={200}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              width: "100%",
              height: "100%",
            }}
          >
            <Swiper
              modules={[Navigation, Keyboard]}
              navigation={false} // Отключаем встроенную навигацию
              keyboard={{
                enabled: true,
              }}
              initialSlide={currentImageIndex}
              onSlideChange={(swiper) => {
                const newIndex = swiper.activeIndex;
                if (newIndex > currentImageIndex) {
                  handleNext();
                } else {
                  handlePrev();
                }
              }}
              style={{
                width: "100%",
                height: "100%",
              }}
            >
              {images.map((image, index) => (
                <SwiperSlide key={index}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    {loading && (
                      <CircularProgress
                        style={{ color: "white" }}
                        sx={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                        }}
                      />
                    )}
                    <img
                      src={image}
                      alt={`Gallery Item ${index + 1}`}
                      style={{
                        width: "auto",
                        maxWidth: isSmallScreen ? "100%" : "80%",
                        maxHeight: "90vh",
                        objectFit: "contain",
                        display: loading ? "none" : "block",
                      }}
                    />
                  </Box>
                </SwiperSlide>
              ))}
              <NavigationButtons />
            </Swiper>
            <CloseIcon 
              sx={{
                position: 'absolute',
                top: { xs: 8, sm: 16, md: 24 },
                right: { xs: 8, sm: 16, md: 24 },
                color: 'white',
                cursor: 'pointer',
                zIndex: 2,
                fontSize: { xs: 24, sm: 32 },
                '&:hover': {
                  opacity: 0.8,
                },
              }} 
              onClick={handleClose} 
            />
          </Box>
        </Fade>
      </Box>
    </Modal>
  );
};

export default ImageModal;
