import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIosOutlined";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Box, SxProps, Theme, useMediaQuery } from "@mui/material";
import React, { ReactNode } from "react";
import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper } from "swiper/react";
import { NavigationOptions } from "swiper/types";
import styles from "./styles";

interface Carousel {
  slidesToShow: number;
  slidesToShowMob: number;
  children: ReactNode;
  spaceBetween?: number;
  loop?: boolean;
  onSlideChange?: any;
  iconFill?: any;
  sx?: SxProps<Theme>;
}

const MySwiper = ({
  slidesToShow,
  slidesToShowMob,
  spaceBetween,
  children,
  sx,
  iconFill,
  ...props
}: Carousel) => {
  SwiperCore.use([Navigation]);
  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );

  const navigationPrevRef = React.useRef(null);
  const navigationNextRef = React.useRef(null);

  const sliderStyle = {
    ...styles.slider,
    ...sx,
  };

  return (
    <Box sx={styles.carouselContainer}>
      <Swiper
        navigation={{
          prevEl: navigationPrevRef.current!,
          nextEl: navigationNextRef.current!,
        }}
        onBeforeInit={(swiper) => {
          if (swiper.params.navigation) {
            (swiper.params.navigation as NavigationOptions).prevEl =
              navigationPrevRef.current;
            (swiper.params.navigation as NavigationOptions).nextEl =
              navigationNextRef.current;
          }
        }}
        // slidesPerView={!isSmallScreen ? slidesToShow : slidesToShowMob}
        style={sliderStyle}
        spaceBetween={spaceBetween}
        // breakpointsBase='window'
        breakpoints={{
          640: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        {...props}
      >
        {children}
      </Swiper>
      <Box sx={styles.sliderArrow} ref={navigationPrevRef}>
        <ArrowBackIosIcon style={{ fill: iconFill }} />
      </Box>
      <Box sx={styles.sliderArrow} ref={navigationNextRef}>
        <ArrowForwardIosIcon style={{ fill: iconFill }} />
      </Box>
    </Box>
  );
};
export default MySwiper;
