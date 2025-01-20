import { Box, CardMedia, Grid } from "@mui/material";
import { FC, memo, useState } from "react";
import styles from "./styles";
import { Material } from "/api/types";
import Text from "/components/atoms/text/Text";
interface GraniteListItemProps extends Material {}

const GraniteListItem: FC<GraniteListItemProps> = memo(
  ({ title, description, image }) => {
    const [hovered, setHovered] = useState(false);

    return (
      <Grid
        item
        xs={4}
        sm={4}
        md={3}
        lg={2}
        xl={2}
        sx={styles.cardContainer}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Box sx={styles.card}>
          <Box sx={[styles.cardInner, hovered && styles.cardFlipped]}>
            <Box sx={styles.cardFront}>
              {image && (
                <CardMedia
                  component="img"
                  image={image}
                  alt={title}
                  sx={{ maxWidth: "100%", maxHeight: "300px", aspectRatio: 1 }}
                />
              )}
              <Text variant="h4" sx={styles.cardText}>
                {title}
              </Text>
            </Box>
            <Box sx={styles.cardBack}>
              <Text variant="h4" sx={styles.cardDescription}>
                {description}
              </Text>
            </Box>
          </Box>
        </Box>
      </Grid>
    );
  }
);

export default GraniteListItem;
