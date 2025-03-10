import { Box, Container, Theme, useMediaQuery } from "@mui/material";
import arrowLeft from "../../../assets/img/arrowLeft.png";
import arrowRight from "../../../assets/img/arrowRight.png";
import carouselCloud from "../../../assets/img/carouselCloud.png";
import Text from "../../atoms/text/Text";
import Carousel from "./Carousel";
import styles from "./styles";
import { useMainPageContext } from "/contexts/MainPageContext";
import Loading from "/components/atoms/loading/Loading";
import FadeInWhenVisible from "/components/animations/FadeInWhenVisible";

const Decor = () => {
  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );
  const { decorCatalog, catalogSections } = useMainPageContext();

  // Находим секцию с carousel: true
  const carouselSection = catalogSections.find(section => section.carousel);
  
  if (!decorCatalog.length || !carouselSection) return null;

  return (
    <Box sx={styles.container}>
      <Container maxWidth="xl" sx={styles.content}>
        <FadeInWhenVisible delay={0.1} direction="up">
          <Box sx={styles.titleBox}>
            <Box sx={styles.arrowContainer}>
              <Box
                component="img"
                sx={styles.arrow}
                alt="Arrow left"
                src={arrowLeft}
              />
            </Box>
            <Text
              variant={isSmallScreen ? "h2" : "h1"}
              customColor="text.secondary"
              sx={styles.title}
              animated
              animationType="highlight"
            >
              {carouselSection.title}
            </Text>
            <Box sx={styles.arrowContainer}>
              <Box
                component="img"
                sx={styles.arrow}
                alt="Arrow right"
                src={arrowRight}
              />
            </Box>
          </Box>
        </FadeInWhenVisible>
        
        <FadeInWhenVisible delay={0.3}>
          <Carousel
            items={decorCatalog.map((item) => ({
              id: item.id,
              title: item.title,
              link: item.full_slug,
              image: item.image || "",
            }))}
          />
        </FadeInWhenVisible>
      </Container>
      <Box component={"img"} src={carouselCloud} sx={styles.cloud} />
    </Box>
  );
};

export default Decor;
