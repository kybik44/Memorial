import { Box, Button, Stack, Theme, useMediaQuery } from "@mui/material";
import Image from "mui-image";
import styles from "./styles";
import Text from "/components/atoms/text/Text";
import MySwiper from "/components/molecules/swiper/MySwiper";

interface CarouselItem {
  id: number;
  title: string;
  link: string;
  image: string;
}

interface CarouselProps {
  items: CarouselItem[];
}

const Carousel = ({ items }: CarouselProps) => {
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("md")
  );

  return (
    <Box sx={styles.carouselContainer}>
      <MySwiper
        slidesToShow={4}
        slidesToShowMob={1}
        spaceBetween={20}
        iconFill={isMobile ? "#313131" : "#fff"}
        breakpoints={{
          1920: { slidesPerView: 4 },
          1440: { slidesPerView: 4 },
          1280: { slidesPerView: 3 },
          960: { slidesPerView: 2 },
          600: { slidesPerView: 1 },
        }}
      >
        {items.map((item, index) => (
          <Stack key={`${item.id}-${index}`} direction="column" sx={styles.card}>
            <Box sx={styles.imageContainer}>
              <Box sx={styles.imageWrapper}>
                <Image
                  alt={item.title}
                  src={item.image}
                  duration={300}
                  errorIcon
                  fit="contain"
                  showLoading={false}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    width: "auto",
                    height: "auto",
                  }}
                  wrapperStyle={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                />
              </Box>
            </Box>
            <Box sx={styles.cardFooter}>
              <Text variant="h6" sx={styles.cardTitle}>
                {item.title}
              </Text>
              <Button size="small" sx={styles.button}>
                Перейти в каталог
              </Button>
            </Box>
          </Stack>
        ))}
      </MySwiper>
    </Box>
  );
};

export default Carousel;
