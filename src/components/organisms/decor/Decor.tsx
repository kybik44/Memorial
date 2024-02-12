import { Box, Container, Theme, useMediaQuery } from "@mui/material";
import arrowLeft from "../../../assets/img/arrowLeft.png";
import arrowRight from "../../../assets/img/arrowRight.png";
import carouselCloud from "../../../assets/img/carouselCloud.png";
import Text from "../../atoms/text/Text";
import Carousel from "./Carousel";
import styles from "./styles";
import { decorItems } from "../../../utils/mock";

const Decor = () => {
  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );

  return (
    <Box sx={styles.container}>
      <Container maxWidth="xl" sx={styles.content}>
        <Box sx={styles.titleBox}>
          <Box sx={styles.arrowContainer}>
            <Box
              component="img"
              sx={styles.arrow}
              alt="Arrows"
              src={arrowLeft}
            />
          </Box>
          <Text
            variant={isSmallScreen ? "h2" : "h1"}
            customColor="text.secondary"
            sx={styles.title}
          >
            Оформление и декор
          </Text>
          <Box sx={styles.arrowContainer}>
            <Box
              component="img"
              sx={styles.arrow}
              alt="Arrows"
              src={arrowRight}
            />
          </Box>
        </Box>
        <Carousel items={decorItems} />
      </Container>
      <Box component={"img"} src={carouselCloud} sx={styles.cloud} />
    </Box>
  );
};

export default Decor;
