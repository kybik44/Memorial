import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Theme,
  useMediaQuery,
} from "@mui/material";
import {
  FC,
  Fragment,
  Suspense,
  memo,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useLocation } from "react-router-dom";
import ContactPopup from "../contact-popup/ContactPopup";
import ImageModal from "../ImageModal/ImageModal";
import MySwiper from "../swiper/MySwiper";
import styles from "./styles";
import { getItemDetails } from "../../../api/api";
import { Item, MaterialItem } from "../../../api/types";
import blackArrow from "../../../assets/img/blackArrow.png";
import LazyImage from "../../../components/atoms/lazy-image/LazyImage";
import Text from "../../../components/atoms/text/Text";
import useGallery from "../../../hooks/useGallery";
import imageCache from "../../../services/ImageCache";

interface CatalogItemProps {
  productId: string | number;
}

// Проверка наличия изображения
const hasValidImage = (material: any) => {
  return material && material.image && typeof material.image === 'string';
};

// Проверка наличия composite изображения
const hasValidCompositeImage = (material: any, index: number) => {
  return material && 
         material.composite && 
         Array.isArray(material.composite) && 
         material.composite.length > index && 
         material.composite[index] && 
         material.composite[index].image && 
         typeof material.composite[index].image === 'string';
};

const CatalogItem: FC<CatalogItemProps> = ({ productId }) => {
  const [item, setItem] = useState<Item | null>(null);
  const [activeMaterial, setActiveMaterial] = useState<MaterialItem | null>(
    null
  );
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isContactPopupOpen, setIsContactPopupOpen] = useState(false);
  const location = useLocation();

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

  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("lg")
  );

  const getDisplayImages = useCallback(() => {
    if (!item) return [];
    let listImages: any[] = [];

    // If use_in is true, combine item images with material images
    if (item.use_in === true) {
      listImages = item.images || [];
    }
    if (activeMaterial?.images) {
      listImages = [...listImages, ...activeMaterial.images];
    }

    // Otherwise just return material images
    return listImages;
  }, [item, activeMaterial]);

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

        // Preload all material images for better experience when changing materials
        if (itemDetails.material_item) {
          const allMaterialImages: string[] = [];

          // Collect all material images to preload
          itemDetails.material_item.forEach((material) => {
            if (material.material?.image) {
              allMaterialImages.push(material.material.image);
            }

            if (
              material.material?.is_composite &&
              material.material.composite
            ) {
              material.material.composite.forEach((comp) => {
                if (comp.image) allMaterialImages.push(comp.image);
              });
            }
          });

          // Preload in batches
          if (allMaterialImages.length > 0) {
            imageCache.preloadBatch(allMaterialImages);
          }
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

    // Preload material images when changing material
    if (material.images) {
      const imagesToPreload = material.images.map((img) => img.image);
      imageCache.preloadBatch(imagesToPreload);
    }
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
      // Use our image cache service instead of manually preloading
      const imagesToPreload = activeMaterial.images.map((img) => img.image);
      imageCache.preloadBatch(imagesToPreload);
    }
  }, [activeMaterial]);

  // Preload next and previous slide images for smoother sliding experience
  useEffect(() => {
    const images = getDisplayImages();
    if (images.length === 0) return;

    // Get indexes of next and previous slides
    const nextSlide = (currentSlide + 1) % images.length;
    const prevSlide = (currentSlide - 1 + images.length) % images.length;

    // Create array of image URLs to preload
    const imagesToPreload = [
      images[nextSlide]?.image,
      images[prevSlide]?.image,
    ].filter(Boolean);

    // Preload these images
    if (imagesToPreload.length > 0) {
      imageCache.preloadBatch(imagesToPreload);
    }
  }, [currentSlide, getDisplayImages]);

  // Update the images array when display images change
  useEffect(() => {
    const displayImages = getDisplayImages();
    if (displayImages.length > 0) {
      const imageUrls = displayImages.map(img => img.image);
      setImages(imageUrls);
    }
  }, [getDisplayImages, setImages]);

  const handleContactClick = () => {
    setIsContactPopupOpen(true);
  };

  const handleCloseContactPopup = () => {
    setIsContactPopupOpen(false);
  };

  // Handle clicking on an image
  const handleImageClick = (index: number) => {
    handleImage(index);
  };

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

  // Отрендерить блок материалов для мобильной версии
  const renderMaterialItem = (material: MaterialItem, isMobile: boolean, handleMaterialChange: (material: MaterialItem) => void) => {
    if (!material || !material.material) return null;

    if (material.material.is_composite) {
      // Проверяем наличие composite массива и его элементов
      const hasComposite0 = hasValidCompositeImage(material.material, 0);
      const hasComposite1 = hasValidCompositeImage(material.material, 1);
      
      if (!hasComposite0 && !hasComposite1) return null;
      
      // Для десктопной версии оборачиваем в Grid item
      if (!isMobile) {
        return (
          <Grid item sx={styles.infoItem} key={material.material.id || `composite-${Math.random()}`}>
            {hasComposite0 && (
              <Box
                component="img"
                sx={styles.color}
                style={styles.img_left as React.CSSProperties}
                alt={material.material?.title || 'Материал'}
                src={material.material.composite[0].image}
                onClick={() => handleMaterialChange(material)}
              />
            )}
            {hasComposite1 && (
              <Box
                component="img"
                sx={styles.color}
                style={styles.img_right as React.CSSProperties}
                alt={material.material?.composite[1]?.title || 'Материал'}
                src={material.material.composite[1].image}
                onClick={() => handleMaterialChange(material)}
              />
            )}
          </Grid>
        );
      } else {
        // Мобильная версия
        return (
          <Fragment key={material.material.id || `composite-${Math.random()}`}>
            {hasComposite0 && (
              <Box
                component="img"
                sx={styles.color}
                style={styles.img_left as React.CSSProperties}
                alt={material.material?.title || 'Материал'}
                src={material.material.composite[0].image}
                onClick={() => handleMaterialChange(material)}
              />
            )}
            {hasComposite1 && (
              <Box
                component="img"
                sx={styles.color}
                style={styles.img_right as React.CSSProperties}
                alt={material.material?.composite[1]?.title || 'Материал'}
                src={material.material.composite[1].image}
                onClick={() => handleMaterialChange(material)}
              />
            )}
          </Fragment>
        );
      }
    } else {
      // Обычный материал с одним изображением
      return hasValidImage(material.material) ? (
        <Box
          key={material.material.id || `material-${Math.random()}`}
          component="img"
          sx={styles.color}
          alt={material.material?.title || 'Материал'}
          src={material.material.image}
          onClick={() => handleMaterialChange(material)}
        />
      ) : null;
    }
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
            >
              {getDisplayImages().map((img, index) => (
                <Box
                  key={index}
                  sx={{
                    ...styles.imageContainer,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    aspectRatio: "4/3",
                    cursor: "pointer",
                  }}
                  onClick={() => handleImageClick(index)}
                >
                  <LazyImage
                    alt={`${item?.title} - изображение ${index + 1}`}
                    src={img.image}
                    // Set preload to true for active image and adjacent images
                    preload={
                      index === currentSlide ||
                      index ===
                        (currentSlide + 1) % getDisplayImages().length ||
                      index ===
                        (currentSlide - 1 + getDisplayImages().length) %
                          getDisplayImages().length
                    }
                    style={{
                      width: "100%",
                      height: "100%",
                      maxWidth: "400px",
                      objectFit: "contain",
                      aspectRatio: "4/3",
                    }}
                  />
                </Box>
              ))}
            </MySwiper>
          </Box>
        </Suspense>
        {isMobile && (
          <Grid item sx={styles.colors}>
            {item.material_item.map((material) => renderMaterialItem(material, isMobile, handleMaterialChange))}
          </Grid>
        )}

        <Grid container sx={styles.gridContainer}>
          <Grid item sx={styles.infoItem}>
            <Text variant="h4" sx={styles.title}>
              {item.title}
            </Text>
          </Grid>

          {getAllDescriptions().length ? (
            <>
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
                    <div dangerouslySetInnerHTML={{ __html: desc.value }} />
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
            </>
          ) : null}

          <Grid item sx={styles.infoItem}>
            <div
              style={{ whiteSpace: "pre-line" }}
              dangerouslySetInnerHTML={{ __html: item.description }}
            />
          </Grid>
          <Grid item sx={styles.infoItem}>
            <div
              style={{ whiteSpace: "pre-line" }}
              dangerouslySetInnerHTML={{
                __html: activeMaterial?.material.description || "",
              }}
            />
          </Grid>

          {!isMobile && (
            <Grid item sx={styles.colors}>
              {item.material_item.map((material) => renderMaterialItem(material, isMobile, handleMaterialChange))}
            </Grid>
          )}
          <Box sx={styles.priceBlock}>
            <Text variant="subtitle2" sx={styles.price}>
              {activeMaterial?.price && activeMaterial?.price + "бел. р"}
            </Text>
            <Text
              variant="body1"
              customColor="primary.dark"
              sx={styles.clarification}
            >
              {activeMaterial?.add_info ||
                "Для получения точной стоимости обратитесь к нашему менеджеру"}
            </Text>
            <Button sx={styles.button} onClick={handleContactClick}>
              Связаться с нами
            </Button>
          </Box>
        </Grid>
      </Box>
      <ContactPopup
        open={isContactPopupOpen}
        onClose={handleCloseContactPopup}
        productTitle={item?.title}
        currentPage={location.pathname}
      />
      <ImageModal
        open={open}
        currentImageIndex={currentImageIndex}
        loading={modalLoading}
        images={images}
        handlePrev={handlePrev}
        handleNext={handleNext}
        handleClose={handleClose}
      />
    </Box>
  );
};

export default memo(CatalogItem);
