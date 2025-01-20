import React, { ReactNode, useRef, useState, useEffect } from "react";
import { Box, SxProps, Theme } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIosOutlined";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import styles from "./styles";

interface Breakpoints {
  [width: number]: {
    slidesPerView: number;
  };
}

interface CarouselProps {
  slidesToShow: number;
  slidesToShowMob: number;
  children: ReactNode;
  spaceBetween?: number;
  loop?: boolean;
  onSlideChange?: (index: number) => void;
  iconFill?: string;
  sx?: SxProps<Theme>;
  breakpoints?: Breakpoints;
  showButtons?: boolean;
}

const MySwiper: React.FC<CarouselProps> = ({
  slidesToShow,
  slidesToShowMob,
  spaceBetween = 0,
  children,
  sx,
  iconFill = "#000",
  breakpoints,
  onSlideChange,
  loop = false,
  showButtons = true,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(slidesToShow);
  const containerRef = useRef<HTMLDivElement>(null);
  const slideContainerRef = useRef<HTMLDivElement>(null);

  const updateSlidesPerView = () => {
    if (breakpoints) {
      const viewportWidth = window.innerWidth;
      const breakpoint = Object.keys(breakpoints)
        .reverse()
        .find((width) => viewportWidth >= parseInt(width));

      if (breakpoint) {
        setSlidesPerView(breakpoints[breakpoint].slidesPerView);
      } else {
        setSlidesPerView(slidesToShowMob);
      }
    }
  };

  useEffect(() => {
    updateSlidesPerView();
    window.addEventListener("resize", updateSlidesPerView);
    return () => {
      window.removeEventListener("resize", updateSlidesPerView);
    };
  }, []);

  const totalSlides = React.Children.count(children);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex - 1;
      if (onSlideChange) onSlideChange(newIndex);
      return newIndex;
    });
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex + 1;
      if (onSlideChange) onSlideChange(newIndex);
      return newIndex;
    });
  };

  return (
    <Box sx={{ ...styles.container, ...sx }} ref={containerRef}>
      <Box sx={styles.carouselContainer}>
        <Box
          ref={slideContainerRef}
          sx={{
            ...styles.slideContainer,
            transform: `translateX(-${(currentIndex * 100) / slidesPerView}%)`,
          }}
        >
          {React.Children.map(children, (child) => (
            <Box
              sx={{
                ...styles.slide,
                flex: `0 0 ${100 / slidesPerView}%`,
                padding: `0 ${spaceBetween / 2}px`,
              }}
            >
              {child}
            </Box>
          ))}
        </Box>
      </Box>
      {showButtons && (
        <>
          <Box
            sx={{
              ...styles.sliderArrow,
              visibility: currentIndex === 0 ? "hidden" : "visible",
            }}
            onClick={handlePrev}
          >
            <ArrowBackIosIcon style={{ fill: iconFill }} />
          </Box>
          <Box
            sx={{
              ...styles.sliderArrow,
              visibility:
                currentIndex >= totalSlides - slidesPerView
                  ? "hidden"
                  : "visible",
            }}
            onClick={handleNext}
          >
            <ArrowForwardIosIcon style={{ fill: iconFill }} />
          </Box>
        </>
      )}
    </Box>
  );
};

export default MySwiper;
