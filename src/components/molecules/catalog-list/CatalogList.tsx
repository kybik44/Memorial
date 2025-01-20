import { Button, Card, CardMedia, Grid } from "@mui/material";
import { FC } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./styles";
import Text from "/components/atoms/text/Text";

interface ICatalogList {
  catalogItems: any[];
}

const CatalogList: FC<ICatalogList> = ({ catalogItems }) => {
  const { section, subsection, productId } = useParams<{
    section: string;
    subsection: string;
    productId: string;
  }>();
  return (
    <Grid
      container
      spacing={{ xs: 2, sm: 3, md: 4, lg: 6 }}
      sx={styles.gridContainer}
    >
      {catalogItems.map(({ id, title, image, price }) => (
        <Grid item key={id} xs={6} sm={6} md={6} lg={4} xl={3}>
          <Card sx={styles.card}>
            <CardMedia
              component="img"
              sx={styles.image}
              image={image}
              alt={title}
            />
            <Text variant="h5" component="div" sx={styles.cardTitle}>
              {title}
            </Text>
            <Text variant="body2" fontWeight={700} color="text.secondary">
              {price} бел. р
            </Text>
            <Button size="small" sx={styles.button}>
              <Link
                to={`/catalog/${section}/${subsection}/${id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Подробнее
              </Link>
            </Button>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default CatalogList;
