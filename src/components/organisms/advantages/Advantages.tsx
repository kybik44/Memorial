import { Box, Container, Grid, Theme, useMediaQuery } from "@mui/material";
import { ReactNode, memo } from "react";
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

const AdvantagesList = memo(
  ({
    isSmallScreen,
    iconProperties,
  }: {
    isSmallScreen: boolean;
    iconProperties: { height: string; width: string };
  }) => {
    const advantagesInfo = getAdvantagesInfo(isSmallScreen, iconProperties);

    return (
      <Grid
        container
        direction="row"
        rowGap={{ xs: 2, sm: 2, xl: 5 }}
        sx={styles.advantages}
      >
        {advantagesInfo.map(({ title, subtitle, icon }, index) => (
          <Grid item key={index} sx={styles.item} xs={12} sm={12} md={6} xl={5}>
            {icon}
            <Box sx={styles.textBlock}>
              <Text variant="h3" sx={styles.itemTitle}>
                {title}
              </Text>
              <Text variant="h6">{subtitle}</Text>
            </Box>
          </Grid>
        ))}
      </Grid>
    );
  }
);

const Advantages = () => {
  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );

  const iconProperties = {
    height: "40px",
    width: "30px",
  };

  return (
    <Box sx={styles.container}>
      <Container maxWidth="xl" sx={styles.content}>
        <Box sx={styles.titleBox}>
          <Box sx={styles.arrowContainer}>
            <Box
              component="img"
              sx={styles.arrow}
              alt="Arrow left"
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
              alt="Arrow right"
              src={arrowRightGreen}
            />
          </Box>
        </Box>
        <AdvantagesList
          isSmallScreen={isSmallScreen}
          iconProperties={iconProperties}
        />
      </Container>
    </Box>
  );
};

export default memo(Advantages);
