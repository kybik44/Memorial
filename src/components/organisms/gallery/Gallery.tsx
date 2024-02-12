import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Fade,
  ImageList,
  ImageListItem,
  Modal,
  Theme,
  useMediaQuery,
} from "@mui/material";
import { useEffect, useState } from "react";
import styles from "./styles";
import Text from "/components/atoms/text/Text";
import ClickIcon from "/icons/ClickIcon";
import { galleryItems } from "/utils/mock";

export interface GalleryItem {
  id: number;
  img: string;
  title: string;
  rows?: number;
  cols?: number;
}

function srcset(image: string, size: number, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

const GalleryItem = ({
  item,
  onClick,
}: {
  item: GalleryItem;
  onClick: (value: string) => void;
}) => {
  return (
    <ImageListItem
      key={item.img}
      cols={item.cols || 1}
      rows={item.rows || 1}
      sx={styles.listItem}
    >
      <img
        {...srcset(item.img, 250, item.rows, item.cols)}
        alt={item.title}
        loading="lazy"
        onClick={(e) => onClick(item.img)}
      />
    </ImageListItem>
  );
};

const Gallery = () => {
  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );
  const [open, setOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [image, setImage] = useState<string>(
    galleryItems[currentImageIndex].img
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setImage(galleryItems[currentImageIndex].img);
    setLoading(false);
  }, [currentImageIndex]);

  const handleImage = (value: string) => {
    setImage(value);
    setOpen(true);
  };

  const handlePrev = () => {
    const newIndex =
      (currentImageIndex - 1 + galleryItems.length) % galleryItems.length;
    setCurrentImageIndex(newIndex);
  };

  const handleNext = () => {
    const newIndex = (currentImageIndex + 1) % galleryItems.length;
    setCurrentImageIndex(newIndex);
  };

  const handleClose = () => {
    console.log("123");
    setOpen(false);
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
            {galleryItems.map((item) => (
              <GalleryItem key={item.img} item={item} onClick={handleImage} />
            ))}
          </ImageList>
          {isSmallScreen ? (
            <ClickIcon />
          ) : (
            <Button size="small" sx={styles.button}>
              Посмотреть больше работ
            </Button>
          )}
        </Container>
      </Box>
      <Modal open={open} onClose={handleClose}>
        <Box sx={styles.modalBox}>
          <Fade in={open} timeout={200}>
            <Box sx={styles.box}>
              <Box onClick={() => handlePrev()} sx={styles.navButton}>
                <ArrowBackIosNewIcon sx={styles.arrow} />
              </Box>
              {!loading ? (
                <img
                  src={image}
                  alt="asd"
                  style={{
                    maxHeight: isSmallScreen ? "80% " : "50%",
                    maxWidth: isSmallScreen ? "80% " : "50%",
                    textAlign: "center",
                  }}
                />
              ) : (
                <CircularProgress color="inherit" />
              )}
              <Box onClick={() => handleNext()} sx={styles.navButton}>
                <ArrowForwardIosIcon sx={styles.arrow} />
              </Box>
            </Box>
          </Fade>
          <CloseIcon sx={styles.close} onClick={() => handleClose()} />
        </Box>
      </Modal>
    </>
  );
};

export default Gallery;
