import { ImageListItem } from "@mui/material";
import styles from "./styles";
import { FC } from "react";
import { api } from "/api/api";

export interface GalleryItemProps {
  id: number;
  img: string;
  title: string;
  rows?: number;
  cols?: number;
}

const GalleryItem: FC<{
  item: GalleryItemProps;
  onClick: (index: number) => void;
  index: number;
}> = ({ item, onClick, index }) => {
  const { img, title, rows = 1, cols = 1 } = item;
  const size = 250;
  const imageSrc = `${api.defaults.baseURL}${img}`;
  const src = `${imageSrc}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`;
  const srcSet = `${imageSrc}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format&dpr=2 2x`;

  return (
    <ImageListItem cols={cols} rows={rows} sx={styles.listItem}>
      <img
        src={src}
        srcSet={srcSet}
        alt={title}
        loading="lazy"
        onClick={() => onClick(index)}
        style={{ cursor: "pointer" }}
      />
    </ImageListItem>
  );
};

export default GalleryItem;
