import { Collapse, Grid, Theme, useMediaQuery } from "@mui/material";
import Image from "mui-image";
import { FC } from "react";
import Text from "/components/atoms/text/Text.tsx";
import styles from "./styles.ts";

interface CardListItem {
  title: string;
  image: string;
}

interface GraniteListItem {
  cards: CardListItem[];
  expanded: boolean;
}

const GraniteList: FC<GraniteListItem> = ({ cards, expanded }) => {
  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );
  return (
    <Collapse
      in={!expanded}
      timeout={1000}
      collapsedSize={isSmallScreen ? 650 : 850}
      sx={styles.collapse}
    >
      <Grid
        container
        columnSpacing={{ xs: 2, sm: 2, md: 4, lg: 4 }}
        rowSpacing={{ xs: 2, sm: 4, md: 6, lg: 8 }}
        sx={{ ...styles.cards }}
      >
        {cards.map(({ title, image }: CardListItem) => (
          <Grid
            item
            sx={styles.cardContainer}
            key={`${title} ${image}`}
            xs={4}
            sm={4}
            md={3}
            lg={2}
          >
            <Image
              src={image}
              alt={title}
              errorIcon
              easing="2000ms cubic-bezier(0.7, 0, 0.6, 1) 0s 1 normal none running"
              fit="contain"
              wrapperStyle={{ maxHeight: isSmallScreen ? "115px" : "300px" }}
            />
            <Text variant="h4" sx={styles.cardText}>
              {title}
            </Text>
          </Grid>
        ))}
      </Grid>
    </Collapse>
  );
};

export default GraniteList;
