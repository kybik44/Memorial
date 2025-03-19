import { Box, Theme } from "@mui/material";
import { SxProps } from "@mui/system";
import React, {
  ReactNode,
  TouchEvent,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import styles from "./styles";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

interface Breakpoints {
  [key: string]: {
    slidesPerView: number;
  };
}

interface CarouselProps {
  slidesToShow: number;
  slidesToShowMob: number;
  children: ReactNode;
  spaceBetween?: number;
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
  showButtons = true,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(slidesToShow);
  const containerRef = useRef<HTMLDivElement>(null);
  const slideContainerRef = useRef<HTMLDivElement>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;
  const totalSlides = React.Children.count(children);

  useEffect(() => {
    if (currentIndex >= totalSlides) {
      setCurrentIndex(0);
    }
  }, [totalSlides, currentIndex]);

  const updateSlidesPerView = useCallback(() => {
    if (breakpoints) {
      const viewportWidth = window.innerWidth;
      const breakpoint = Object.keys(breakpoints)
        .reverse()
        .find((width) => viewportWidth >= parseInt(width));

      if (breakpoint) {
        setSlidesPerView(breakpoints[breakpoint as keyof typeof breakpoints].slidesPerView);
      } else {
        setSlidesPerView(slidesToShowMob);
      }
    }
  }, [breakpoints, slidesToShowMob]);

  // Initialize slidesPerView based on breakpoints
  useEffect(() => {
    updateSlidesPerView();
  }, [updateSlidesPerView]);

  // Add resize listener
  useEffect(() => {
    window.addEventListener("resize", updateSlidesPerView);
    return () => {
      window.removeEventListener("resize", updateSlidesPerView);
    };
  }, [updateSlidesPerView]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = Math.max(0, prevIndex - 1);
      if (onSlideChange) onSlideChange(newIndex);
      return newIndex;
    });
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = Math.min(totalSlides - slidesPerView, prevIndex + 1);
      if (onSlideChange) onSlideChange(newIndex);
      return newIndex;
    });
  };

  const onTouchStart = (e: TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && currentIndex < totalSlides - slidesPerView) {
      handleNext();
    }
    if (isRightSwipe && currentIndex > 0) {
      handlePrev();
    }
  };

  // Create a custom style object that merges the base styles with any provided sx prop
  const containerStyle = {
    ...styles.container,
    ...(sx || {}),
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }} ref={containerRef}>
      <Box sx={containerStyle}>
        <div
          ref={slideContainerRef}
          style={{
            display: "flex",
            transition: "transform 0.3s ease",
            transform: `translateX(-${currentIndex * (100 / slidesPerView)}%)`,
            width: "100%",
            height: "100%",
          }}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
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
        </div>
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
    </div>
  );
};

export default MySwiper;
