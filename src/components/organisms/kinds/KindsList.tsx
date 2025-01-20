import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
} from "@mui/material";
import Image from "mui-image";
import { FC, memo } from "react";
import styles from "./styles";
import Text from "/components/atoms/text/Text";

interface CardListItem {
  title: string;
  image: string;
}

const KindsList: FC<{ cards: CardListItem[] }> = memo(({ cards }) => {
  return (
    <Grid
      container
      spacing={{ xs: 0, sm: 4, lg: 8, xl: 10 }}
      sx={styles.gridContainer}
    >
      {cards.map(({ title, image }) => (
        <Grid key={title} item xs={12} sm={6} md={4} lg={3}>
          <Card sx={styles.card}>
            <Box sx={styles.image}>
              <Image
                fit="contain"
                alt={title}
                src={image}
                showLoading
                easing="2000ms cubic-bezier(0.7, 0, 0.6, 1)"
                errorIcon
              />
            </Box>
            <Box sx={styles.cardInfo}>
              <CardContent>
                <Text variant="h6" sx={styles.cardTitle}>
                  {title}
                </Text>
              </CardContent>
              <CardActions>
                <Button size="small">Перейти в каталог</Button>
              </CardActions>
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
});

export default KindsList;
