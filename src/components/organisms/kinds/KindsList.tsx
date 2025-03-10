import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  useMediaQuery,
  Theme,
} from "@mui/material";
import Image from "mui-image";
import { FC, memo } from "react";
import styles from "./styles";
import Text from "/components/atoms/text/Text";
import { Link } from "react-router-dom";

interface CardListItem {
  title: string;
  image: string;
  slug: string;
}

const KindsList: FC<{ cards: CardListItem[] }> = memo(({ cards }) => {
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );

  return (
    <Grid
      container
      spacing={{ xs: 1, sm: 4, lg: 8, xl: 10 }}
      sx={styles.gridContainer}
    >
      {cards.map(({ title, image, slug }, index) => (
        <Grid 
          key={title} 
          item 
          xs={12} 
          sm={6} 
          md={4} 
          lg={3}
          sx={{
            mb: isMobile && index !== cards.length - 1 ? 2 : 0
          }}
        >
          <Card sx={styles.card}>
            <Box sx={styles.image}>
              <Image
                fit="contain"
                alt={title}
                src={image}
                showLoading
                duration={300}
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
                <Button size="small" component={Link} to={`/catalog/${slug}`}>
                  Перейти в каталог
                </Button>
              </CardActions>
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
});

export default KindsList;
