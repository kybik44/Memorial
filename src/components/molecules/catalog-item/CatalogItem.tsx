import {
  Box,
  Button,
  Grid,
  Theme,
  useMediaQuery,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState, useCallback, Suspense, memo } from "react";
import MySwiper from "../swiper/MySwiper";
import styles from "./styles";
import { getItemDetails } from "/api/api";
import blackArrow from "/assets/img/blackArrow.png";
import Text from "/components/atoms/text/Text";
import { Item, MaterialItem } from "/api/types";
import LazyImage from "/components/atoms/lazy-image/LazyImage";
import { FC } from "react";
import { SystemStyleObject } from "@mui/system/styleFunctionSx/styleFunctionSx";

interface CatalogItemProps {
  productId: string | number;
}

const CatalogItem: FC<CatalogItemProps> = ({ productId }) => {
  const [item, setItem] = useState<Item | null>(null);
  const [activeMaterial, setActiveMaterial] = useState<MaterialItem | null>(
    null
  );
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);

  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("lg")
  );

  const itemId =
    typeof productId === "string" ? parseInt(productId, 10) : productId;

  const fetchData = useCallback(async (id: number) => {
    try {
      setLoading(true);
      const itemDetails = await getItemDetails(id);
      if (itemDetails) {
        setItem(itemDetails);
        if (itemDetails.material_item.length > 0) {
          setActiveMaterial(itemDetails.material_item[0]);
        }
      }
    } catch (error) {
      console.error("Error fetching item details:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Загружаем данные при изменении productId
  useEffect(() => {
    if (itemId) {
      fetchData(itemId);
    }
  }, [itemId, fetchData]);

  const handleMaterialChange = useCallback((material: MaterialItem) => {
    setActiveMaterial(material);
    setCurrentSlide(0);
  }, []);

  useEffect(() => {
    if (
      activeMaterial &&
      currentSlide >= (activeMaterial.images?.length || 0)
    ) {
      setCurrentSlide(0);
    }
  }, [activeMaterial, currentSlide]);

  // Предзагрузка изображений материала
  useEffect(() => {
    if (activeMaterial?.images) {
      activeMaterial.images.forEach((img) => {
        const image = new Image();
        image.src = img.image;
      });
    }
  }, [activeMaterial]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "400px",
          width: "100%",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!item) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "400px",
          width: "100%",
          backgroundColor: "background.paper",
          borderRadius: 2,
          boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Text variant="h5">Продукт не найден</Text>
      </Box>
    );
  }

  const getAllDescriptions = () => {
    const mainDescriptions = item.main_description || [];
    const materialDescriptions = activeMaterial?.main_description || [];
    return [...mainDescriptions, ...materialDescriptions];
  };

  return (
    <Box sx={styles.container}>
      <Box sx={styles.content}>
        <Suspense fallback={<CircularProgress />}>
          <Box sx={styles.sliderWrapper}>
            <MySwiper
              slidesToShow={1}
              slidesToShowMob={1}
              breakpoints={{
                1920: { slidesPerView: 1 },
              }}
              sx={styles.slid}
              showButtons={true}
              onSlideChange={setCurrentSlide}
              loop={false}
            >
              {activeMaterial?.images?.map((img, index) => (
                <Box
                  key={index}
                  sx={{
                    ...styles.imageContainer,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    aspectRatio: "16/9",
                  }}
                >
                  <LazyImage
                    alt={`${item.title} - изображение ${index + 1}`}
                    src={img.image}
                    style={{
                      width: "100%",
                      height: "100%",
                      maxWidth: "400px",
                      objectFit: "contain",
                      aspectRatio: "16/9",
                    }}
                  />
                </Box>
              ))}
            </MySwiper>
          </Box>
        </Suspense>
        {isMobile && (
          <Grid item sx={styles.colors}>
            {item.material_item.map((material) => (
              <Box
                key={material.material.id}
                component="img"
                sx={styles.color}
                alt={material.material.title}
                src={material.material.image}
                onClick={() => handleMaterialChange(material)}
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

          {getAllDescriptions().map((desc, index) => (
            <Grid item key={`${desc.name}-${index}`} sx={styles.infoItem}>
              <Text variant="h4" sx={styles.subtitle}>
                {desc.name}
              </Text>
              <Text
                variant="h5"
                sx={{ ...styles.text, lineHeight: "25px" }}
                multiline
              >
                {desc.value}
              </Text>
            </Grid>
          ))}

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
            <Text variant="h5" sx={{ whiteSpace: "pre-line" }}>
              {item.description}
            </Text>
          </Grid>
          <Grid item sx={styles.infoItem}>
            <Text variant="h5" sx={{ whiteSpace: "pre-line" }}>
              {activeMaterial?.material.description}
            </Text>
          </Grid>

          {!isMobile && (
            <Grid item sx={styles.colors}>
              {item.material_item.map((material) => (
                <Box
                  key={material.material.id}
                  component="img"
                  sx={styles.color}
                  alt={material.material.title}
                  src={material.material.image}
                  onClick={() => handleMaterialChange(material)}
                />
              ))}
            </Grid>
          )}
          <Box sx={styles.priceBlock}>
            <Text variant="subtitle2" sx={styles.price}>
              {activeMaterial?.price} бел. р
            </Text>
            <Text
              variant="body1"
              customColor="primary.dark"
              sx={styles.clarification}
            >
              {activeMaterial?.add_info ||
                "Для получения точной стоимости обратитесь к нашему менеджеру"}
            </Text>
            <Button sx={styles.button}>Связаться с нами</Button>
          </Box>
        </Grid>
      </Box>
    </Box>
  );
};

export default memo(CatalogItem);
