import { Box, CardMedia, Grid } from "@mui/material";
import { FC, memo, useState } from "react";
import styles from "./styles";
import { Material } from "/api/types";
import Text from "/components/atoms/text/Text";

interface GraniteListItemProps {
  id: number;
  title: string;
  description: string;
  image?: string;
  is_composite: boolean;
  composite: Material[];
}

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
          <div
            className={`card-inner ${hovered ? "card-flipped" : ""}`}
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              transition: "transform 0.6s",
              transformStyle: "preserve-3d",
              transform: hovered ? "rotateY(180deg)" : "rotateY(0deg)",
              ...(styles.cardInner as any),
            }}
          >
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
          </div>
        </Box>
      </Grid>
    );
  }
);

export default GraniteListItem;
