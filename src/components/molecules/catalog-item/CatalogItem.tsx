import { Box, Button, Grid, Theme, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import MySwiper from "../swiper/MySwiper";
import styles from "./styles";
import { getCatalogDetails } from "/api/api";
import blackArrow from "/assets/img/blackArrow.png";
import Text from "/components/atoms/text/Text";
import { catalogItemColors } from "/utils/mock";

const CatalogItem = ({ productId }: { productId: string }) => {
  const [item, setItem] = useState<any>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("lg")
  );

  useEffect(() => {
    const fetchData = async () => {
      const itemDetails = await getCatalogDetails(Number(productId));
      setItem(itemDetails);
    };

    fetchData();
  }, [productId]);

  if (!item) {
    return <Text variant="h5">Продукт не найден</Text>;
  }

  return (
    <Box sx={styles.container}>
      <Box sx={styles.content}>
        <Box sx={styles.sliderWrapper}>
          <MySwiper
            slidesToShow={1}
            slidesToShowMob={1}
            breakpoints={{
              1920: { slidesPerView: 1 },
            }}
            sx={styles.slid}
            showButtons={false}
          >
            {[item].map((item) => (
              <Box key={item.id} sx={styles.imageContainer}>
                <img
                  alt={item.title}
                  src={item.image}
                  style={{ width: "100%", height: "auto", maxWidth: "400px" }}
                />
              </Box>
            ))}
          </MySwiper>
        </Box>
        {isMobile && (
          <Grid item sx={styles.colors}>
            {catalogItemColors.map((color) => (
              <Box
                key={color.name}
                component="img"
                sx={styles.color}
                alt={color.name}
                src={color.image}
                onClick={() => setActiveIndex(color.id)}
              />
            ))}
          </Grid>
        )}
        <Grid container sx={styles.gridContainer}>
          <Grid item sx={styles.infoItem}>
            <Text variant="h4" sx={styles.title}>
              {item.title}
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
          {!isMobile && (
            <Grid item sx={styles.colors}>
              {catalogItemColors.map((color) => (
                <Box
                  key={color.name}
                  component="img"
                  sx={styles.color}
                  alt={color.name}
                  src={color.image}
                  onClick={() => setActiveIndex(color.id)}
                />
              ))}
            </Grid>
          )}
          <Box sx={styles.priceBlock}>
            <Text variant="subtitle2" sx={styles.price}>
              {item.price} бел. р
            </Text>
            <Text
              variant="body1"
              customColor="primary.dark"
              sx={styles.clarification}
            >
              Для получения точной стоимости обратитесь к нашему менеджеру
            </Text>
            <Button sx={styles.button}>Связаться с нами</Button>
          </Box>
        </Grid>
      </Box>
    </Box>
  );
};

export default CatalogItem;
