import { ImageListItem } from "@mui/material";
import styles from "./styles";
import { FC } from "react";
import { OurWorks } from "/api/types";

const GalleryItem: FC<{
  item: OurWorks;
  onClick: (index: number) => void;
  index: number;
}> = ({ item, onClick, index }) => {
  const { image, cropping } = item;

  // Парсим параметры кропа
  const [x, y, width, height] = cropping ? cropping.split(',').map(Number) : [0, 0, 0, 0];

  // Определяем размеры на основе кропа
  const isVertical = height > width;
  const rows = isVertical ? 2 : 1;
  const cols = isVertical ? 1 : 2;

  return (
    <ImageListItem 
      cols={cols} 
      rows={rows} 
      sx={styles.listItem}
    >
      <img
        src={image}
        srcSet={`${image} 2x`}
        alt="Наша работа"
        loading="lazy"
        onClick={() => onClick(index)}
        style={{ 
          cursor: "pointer",
          objectFit: "cover",
          width: "100%",
          height: "100%"
        }}
      />
    </ImageListItem>
  );
};

export default GalleryItem;
