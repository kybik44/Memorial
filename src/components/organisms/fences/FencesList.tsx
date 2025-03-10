import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Theme,
  useMediaQuery,
  Box,
} from "@mui/material";
import Image from "mui-image";
import { FC, memo } from "react";
import Text from "../../atoms/text/Text";
import styles from "./styles";
import FenceCard from "./FenceCard";
import MySwiper from "/components/molecules/swiper/MySwiper";

interface CardListItem {
  title: string;
  image: string;
}

interface IFence {
  id: number;
  title: string;
  image: string;
  link: string;
}

interface FencesListProps {
  items: IFence[];
}

const FencesList: FC<FencesListProps> = ({ items }) => {
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );

  if (isMobile && items.length > 3) {
    return (
      <Box sx={styles.carouselContainer}>
        <MySwiper
          slidesToShow={1}
          slidesToShowMob={1}
          spaceBetween={20}
          iconFill="#313131"
          breakpoints={{
            600: { slidesPerView: 1 },
          }}
        >
          {items.map((item, index) => (
            <Box key={`${item.id}-${index}`} sx={styles.carouselSlide}>
              <FenceCard
                title={item.title}
                image={item.image}
                link={item.link}
              />
            </Box>
          ))}
        </MySwiper>
      </Box>
    );
  }

  return (
    <Grid container spacing={3}>
      {items.map((item) => (
        <Grid item xs={12} sm={6} md={4} key={item.id}>
          <FenceCard
            title={item.title}
            image={item.image}
            link={item.link}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default FencesList;
