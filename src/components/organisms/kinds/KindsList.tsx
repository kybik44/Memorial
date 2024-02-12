import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
} from "@mui/material";
import Image from "mui-image";
import { FC } from "react";
import styles from "./styles.ts";
import Text from "/components/atoms/text/Text.tsx";

interface CardListItem {
  title: string;
  image: string;
}

const KindsList: FC<{ cards: CardListItem[] }> = ({ cards }) => {
  return (
    <Grid
      container
      rowGap={{ xs: 2, sm: 6 }}
      spacing={{ xs: 0, sm: 4, md: 8, lg: 13 }}
      sx={styles.gridContainer}
    >
      {cards.map(({ title, image }: CardListItem) => (
        <Grid key={title} item xs={13} sm={6} md={4} lg={3}>
          <Card sx={styles.card} key={`${title} ${image}`}>
            <Box sx={styles.image}>
              <Image
                fit="contain"
                alt={title}
                src={image}
                showLoading
                easing="2000ms cubic-bezier(0.7, 0, 0.6, 1) 0s 1 normal none running"
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
};

export default KindsList;
