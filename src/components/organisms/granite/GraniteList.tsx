import { Collapse, Grid, Theme, useMediaQuery } from "@mui/material";
import { FC, memo, useMemo } from "react";
import GraniteListItem from "./GraniteListItem";
import styles from "./styles";
import { Material } from "/api/types";

interface GraniteListProps {
  expanded: boolean;
  materials: Material[];
}

const GraniteList: FC<GraniteListProps> = memo(({ materials, expanded }) => {
  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );

  const itemsPerRow = 6;
  const numRows = Math.ceil(materials.length / itemsPerRow);

  const calculateCollapseHeight = () => {
    const maxCardHeight = 300;
    const rowHeight = isSmallScreen ? 130 : 324;
    const collapseHeight =
      numRows <= 1
        ? maxCardHeight
        : Math.min(rowHeight * numRows, maxCardHeight * 2.5);
    return collapseHeight;
  };

  const collapseHeight = useMemo(
    () => calculateCollapseHeight(),
    [materials.length, isSmallScreen]
  );

  // Проверка materials перед использованием
  if (!materials || materials.length === 0) {
    return null;
  }

  return (
    <Collapse
      in={expanded}
      timeout="auto"
      collapsedSize={collapseHeight}
      sx={styles.collapse}
    >
      <Grid
        container
        spacing={{ xs: 2, sm: 2, md: 4, lg: 4 }}
        rowSpacing={{ xs: 2, sm: 4, md: 6, xl: 8 }}
        sx={styles.cards}
      >
        {materials.map((material) => (
          <GraniteListItem
            key={material.id}
            title={material.title}
            image={material.image || ""}
            description={material.description || ""}
          />
        ))}
      </Grid>
    </Collapse>
  );
});

export default GraniteList;
