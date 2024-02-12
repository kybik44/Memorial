import { Box, Container, Grid, Theme, useMediaQuery } from "@mui/material";
import { ReactNode } from "react";
import styles from "./styles";
import arrowLeftGreen from "/assets/img/arrowLeftGreen.png";
import arrowRightGreen from "/assets/img/arrowRightGreen.png";
import Text from "/components/atoms/text/Text";
import { getAdvantagesInfo } from "/utils/mock";

export interface IAdvantagesList {
  title: string;
  subtitle: string;
  icon: ReactNode;
}

const AdvantagesList = () => {
  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );

  const iconProperties = {
    height: "40px",
    width: "30px",
  };

  return (
    <Grid
      container
      direction="row"
      rowGap={{ xs: 2, sm: 2, xl: 5 }}
      sx={styles.advantages}
    >
      {getAdvantagesInfo(isSmallScreen, iconProperties).map(
        ({ title, subtitle, icon }) => (
          <Grid item sx={styles.item} xs={12} sm={12} md={6} xl={5}>
            {icon}
            <Box sx={styles.textBlock}>
              <Text variant="h3" sx={styles.itemTitle}>
                {title}
              </Text>
              <Text variant="h6">{subtitle}</Text>
            </Box>
          </Grid>
        )
      )}
    </Grid>
  );
};

const Advantages = () => {
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
              src={arrowLeftGreen}
            />
          </Box>
          <Text variant={isSmallScreen ? "h2" : "h1"} sx={styles.title}>
            Наши преимущества
          </Text>
          <Box sx={styles.arrowContainer}>
            <Box
              component="img"
              sx={styles.arrow}
              alt="Arrows"
              src={arrowRightGreen}
            />
          </Box>
        </Box>
        <AdvantagesList />
      </Container>
    </Box>
  );
};

export default Advantages;
