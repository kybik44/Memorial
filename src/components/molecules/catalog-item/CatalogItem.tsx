import { Box, Button, Grid } from "@mui/material";
import React, { useState } from "react";
import { SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import styles from "./styles.ts";
import blackArrow from "/assets/img/blackArrow.png";
import Text from "/components/atoms/text/Text.tsx";
import MySwiper from "/components/molecules/swiper/MySwiper.tsx";
import { catalogItemColors } from "/utils/mock.tsx";

const items = [
  {
    id: 1,
    title: "Вазы гранит",
    link: "/catalog/granite-vases",
    image: "/src/assets/img/p (4).png",
  },
  {
    id: 2,
    title: "Оформление и декор",
    link: "/catalog/decor",
    image: "/src/assets/img/p (2).png",
  },
  {
    id: 3,
    title: "Вазы полимерные",
    link: "/catalog/polymer-vases",
    image: "/src/assets/img/p (3).png",
  },
  {
    id: 4,
    title: "Скульптуры полимерные",
    link: "/catalog/polymer-sculptures",
    image: "/src/assets/img/p (4).png",
  },
  {
    id: 5,
    title: "Декор бронза",
    link: "/catalog/bronze-decor",
    image: "/src/assets/img/p (4).png",
  },
];

interface CatalogItem {
  title: string;
  image: string;
  price: number;
  description: string;
  info: {
    size: string;
    weight: string;
    material: string;
  };
  colors: {
    first: "first";
  };
}

const CatalogItem = () => {
  const [activeIndex, setActiveIndex] = useState<number>(
    catalogItemColors[0].id
  );
  const sliderStyle = {
    ...styles.slide,
  };
  return (
    <Box sx={styles.container}>
      <Box sx={styles.sliderWrapper}>
        <MySwiper
          loop={true}
          slidesToShow={1}
          slidesToShowMob={1}
          onSlideChange={(swiper: {
            realIndex: React.SetStateAction<number>;
          }) => setActiveIndex(swiper.realIndex)}
          iconFill={"#000"}
          sx={styles.slider}
        >
          {items.map((item, index) => (
            <SwiperSlide key={index} style={sliderStyle}>
              {/* <img
                alt={item.title}
                src={item.image}
                style={{ width: '100%', height: '100%' }}
              /> */}
              <Box
                component="img"
                sx={styles.image}
                alt="Arrows"
                src={item.image}
              />
            </SwiperSlide>
          ))}
        </MySwiper>
      </Box>

      <Grid container sx={styles.gridContainer} rowGap={"20px"}>
        <Grid item sx={styles.infoItem}>
          <Text variant="h4">Памятник В-1</Text>
        </Grid>
        <Grid item sx={styles.infoItem}>
          <Box
            component="img"
            sx={styles.arrow}
            alt="Arrows"
            src={blackArrow}
          />
        </Grid>
        <Grid item sx={styles.infoItem}>
          <Text variant="h4" sx={styles.subtitle}>
            КОМПЛЕКТ
          </Text>
          <Text
            variant="h5"
            sx={{ ...styles.text, lineHeight: "25px" }}
            multiline
          >
            стела:100 × 50 × 5 (см.)1 шт. подставка:50 × 20 × 15 (см.) 1 шт.
            цветник: 100 × 5 × 8 (см.) 2 шт. цветник: 50 × 5 × 8е (см.) 1 шт.
          </Text>
        </Grid>
        <Grid item sx={styles.infoItem}>
          <Text variant="h4" sx={styles.subtitle}>
            ВЕС КОМПЛЕКТА
          </Text>
          <Text variant="h5" sx={styles.text}>
            150 кг
          </Text>
        </Grid>
        <Grid item sx={styles.infoItem}>
          <Text variant="h4" sx={styles.subtitle}>
            МАТЕРИАЛ
          </Text>
          <Text variant="h5" sx={styles.text}>
            Габро-Диабаз (Карелия, Россия)
          </Text>
        </Grid>
        <Grid item sx={styles.infoItem}>
          <Box
            component="img"
            sx={styles.arrow}
            alt="Arrows"
            src={blackArrow}
          />
        </Grid>
        <Grid item sx={styles.infoItem}>
          <Text
            variant="body1"
            sx={{ fontStyle: "italic", lineHeight: "25px" }}
          >
            художественное оформление не включено в стоимость комплекта
          </Text>
        </Grid>
        <Grid item sx={styles.infoItem}>
          <Text variant="h5">
            Знаковый памятник модели В-1 из Габро-Диабаза представляет собой
            уникальное сочетание прочности камня и эстетики его текстуры,
            создавая вечный и красочный символ памяти.
          </Text>
        </Grid>
        <Grid item sx={styles.colors}>
          {catalogItemColors.map((item) => (
            <Box
              key={item.name}
              component="img"
              sx={styles.color}
              alt="Arrows"
              src={item.image}
              onClick={() => setActiveIndex(item.id)}
            />
          ))}
        </Grid>
        <Box sx={styles.priceBlock}>
          <Text variant="subtitle2">1950, 00 руб</Text>
          <Text
            variant="body1"
            customColor="primary.dark"
            sx={styles.clarification}
          >
            Для получения точной стоимости обратитесь к нашему менеджеру
          </Text>
          <Button>Связаться с нами</Button>
        </Box>
      </Grid>
    </Box>
  );
};

export default CatalogItem;
