import { ImageListItem } from "@mui/material";
import styles from "./styles";
import { FC } from "react";
import { OurWorks } from "/api/types";
import LazyImage from "/components/atoms/lazy-image/LazyImage";

const GalleryItem: FC<{
  item: OurWorks;
  onClick: (index: number) => void;
  index: number;
  optimizedWidth?: number;
  priority?: boolean;
}> = ({ item, onClick, index, optimizedWidth, priority = false }) => {
  const { image, thumbnail, cropping } = item;

  const [cols, rows] = cropping ? cropping.split("x").map(Number) : [1, 1];

  return (
    <ImageListItem cols={cols} rows={rows} sx={styles.listItem} key={image}>
      <LazyImage
        src={thumbnail || image}
        alt="Наша работа"
        width={optimizedWidth}
        priority={priority}
        onClick={() => onClick(index)}
        style={{
          cursor: "pointer",
          objectFit: "cover",
          width: "100%",
          height: "100%",
          borderRadius: "4px"
        }}
      />
    </ImageListItem>
  );
};

export default GalleryItem;
