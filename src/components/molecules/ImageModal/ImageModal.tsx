import {
  Box,
  CircularProgress,
  Fade,
  Modal,
  Theme,
  useMediaQuery,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./styles";

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
            <Box onClick={handlePrev} sx={styles.navButton}>
              <ArrowBackIosNewIcon sx={styles.arrow} />
            </Box>
            <Box sx={styles.imageContainer}>
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
                src={images[currentImageIndex]}
                alt="Gallery Item"
                style={{
                  width: "100%",
                  maxWidth: isSmallScreen ? "100%" : "80%",
                  maxHeight: "100%",
                  display: loading ? "none" : "block",
                }}
              />
            </Box>
            <Box onClick={handleNext} sx={styles.navButton}>
              <ArrowForwardIosIcon sx={styles.arrow} />
            </Box>
            <CloseIcon sx={styles.close} onClick={handleClose} />
          </Box>
        </Fade>
      </Box>
    </Modal>
  );
};

export default ImageModal;
