import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
} from "@mui/material";
import Image from "mui-image";
import Text from "../../atoms/text/Text.tsx";
import styles from "./styles.ts";
import { catalogItems } from "/utils/mock.tsx";

export interface CardListItem {
  title: string;
  image: string;
  price: number;
}

const CatalogList = () => {
  return (
    <Grid
      container
      spacing={{ xs: 0, sm: 4, md: 5, lg: 5 }}
      sx={styles.gridContainer}
    >
      {catalogItems.map(({ title, image, price }: CardListItem) => (
        <Grid key={title} item xs={13} sm={6} md={4} lg={3}>
          <Card sx={styles.card} key={`${title} ${image}`}>
            <Box sx={styles.image}>
              <Image
                fit="contain"
                alt={title}
                src={image}
                showLoading
                duration={0}
                errorIcon
              />
            </Box>
            <Box sx={styles.cardInfo}>
              <CardContent sx={styles.cardContent}>
                <Text variant="h6" sx={styles.cardTitle}>
                  {title}
                </Text>
                <Text variant="h4" sx={styles.cardTitle}>
                  {`${price} бел. р`}
                </Text>
              </CardContent>
              <CardActions>
                <Button size="small" sx={styles.button}>
                  Перейти в каталог
                </Button>
              </CardActions>
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default CatalogList;
