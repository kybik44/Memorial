import { Box, Button, Stack, Theme, useMediaQuery } from "@mui/material";
import Image from "mui-image";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import { SwiperSlide } from "swiper/react";
import styles from "./styles";
import Text from "/components/atoms/text/Text";
import MySwiper from "/components/molecules/swiper/MySwiper";

interface CarouselItem {
  id: number;
  title: string;
  link: string;
  image: string;
}

interface Carousel {
  items: CarouselItem[];
}

const Carousel = ({ items }: Carousel) => {
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );
  return (
    <Box sx={styles.carouselContainer}>
      <MySwiper
        slidesToShow={4}
        slidesToShowMob={1}
        sx={styles.slider}
        spaceBetween={50}
        iconFill={isMobile ? "#313131" : "#fff"}
      >
        {items.map((item) => (
          <SwiperSlide key={item.id}>
            <Stack direction={"column"} spacing={2} sx={styles.card}>
              <Box sx={styles.image}>
                <Image
                  alt={item.title}
                  src={item.image}
                  easing="3000ms cubic-bezier(0.7, 0, 0.6, 1) 0s 1 normal none running"
                  errorIcon
                  fit="contain"
                  // height={170}
                />
                {/* <img
                  alt={item.title}
                  src={item.image}
                  style={{ width: '100%', height: '100%' }}
                /> */}
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
          </SwiperSlide>
        ))}
      </MySwiper>
    </Box>
  );
};
export default Carousel;
