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

  const [cols, rows] = cropping ? cropping.split("x").map(Number) : [1, 1];
  
  return (
    <ImageListItem 
      cols={cols} 
      rows={rows} 
      sx={styles.listItem}
      key={image}
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

