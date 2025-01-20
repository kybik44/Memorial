import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Theme,
  useMediaQuery,
} from "@mui/material";
import Image from "mui-image";
import { FC, memo } from "react";
import Text from "../../atoms/text/Text";
import styles from "./styles";

interface CardListItem {
  title: string;
  image: string;
}

const FencesList: FC<{ cards: CardListItem[] }> = memo(({ cards }) => {
  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );

  return (
    <Grid
      container
      spacing={{ xs: 2, lg: 4 }}
      rowGap={4}
      sx={styles.gridContainer}
    >
      {cards.map(({ title, image }) => (
        <Grid key={title} item sm={12} md={6} lg={4}>
          <Card sx={styles.card}>
            <Image
              alt={title}
              src={image}
              fit="scale-down"
              easing="3000ms cubic-bezier(0.7, 0, 0.6, 1)"
              style={{
                maxWidth: !isSmallScreen ? "100%" : "270px",
                maxHeight: "250px",
              }}
            />
            <CardContent sx={{ p: isSmallScreen ? "10px" : "16px" }}>
              <Text variant="h6" sx={styles.cardTitle}>
                {title}
              </Text>
            </CardContent>
            <CardActions sx={styles.actions}>
              <Button size="small" sx={styles.button}>
                Перейти в каталог
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
});

export default FencesList;
