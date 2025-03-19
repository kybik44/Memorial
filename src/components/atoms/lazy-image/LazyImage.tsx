import { useState, useEffect, useMemo } from "react";
import { Box, Skeleton } from "@mui/material";
import imageCache from "../../../services/ImageCache";

interface LazyImageProps {
  src: string;
  alt: string;
  style?: React.CSSProperties;
  onLoad?: () => void;
  preload?: boolean; // Set to true to force preloading
  width?: number; // Desired width for optimization
  quality?: 'low' | 'medium' | 'high'; // Quality level
  priority?: boolean; // Set to true for high priority loading
  onClick?: () => void; // Добавлен обработчик клика
}

const LazyImage = ({
  src,
  alt,
  style,
  onLoad,
  preload = false,
  width,
  quality = 'high',
  priority = false,
  onClick,
}: LazyImageProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState<string>("");
  const [showLowQuality, setShowLowQuality] = useState(false);
  const [lowQualitySrc, setLowQualitySrc] = useState<string>("");

  // Determine the target width based on style or provided width
  const targetWidth = useMemo(() => {
    if (width) return width;
    
    // Try to infer width from style
    if (style?.width && typeof style.width === 'number') {
      return style.width;
    }
    
    // Default sizes based on quality
    switch (quality) {
      case 'low': return 400;
      case 'medium': return 800;
      case 'high': return 1600;
      default: return 800;
    }
  }, [width, style?.width, quality]);

  // Memoize style properties to prevent unnecessary re-renders
  const styleProps = useMemo(() => {
    return {
      width: style?.width || "100%",
      height: style?.height || "auto",
      aspectRatio: style?.aspectRatio || "1/1", // Default aspect ratio to prevent layout shifts
    };
  }, [style?.width, style?.height, style?.aspectRatio]);

  useEffect(() => {
    // Reset state when src changes
    setImageLoaded(false);
    setShowLowQuality(false);
    setLowQualitySrc("");

    // Check if the image is already in cache
    const cachedImage = imageCache.getFromCache(src);

    if (cachedImage) {
      // If image is already cached, use it immediately
      setImageSrc(src);
      setImageLoaded(true);
      if (onLoad) onLoad();
      return;
    }

    // Check if low quality version is available
    const lowQualityImage = imageCache.getLowQualityFromCache(src);
    if (lowQualityImage) {
      // Show low quality version immediately while loading the full version
      setLowQualitySrc(lowQualityImage.src);
      setShowLowQuality(true);
    }

    // If preload is true or the image is not in cache, load it
    if (preload) {
      // Use our cache service to preload the image
      imageCache
        .preload(src, targetWidth)
        .then(() => {
          setImageSrc(src);
          setImageLoaded(true);
          if (onLoad) onLoad();
        })
        .catch((error) => {
          console.error(`Failed to load image: ${src}`, error);
        });
    } else {
      // Start loading the image with appropriate priority
      imageCache.preloadBatch([src], priority);
      
      // Set up an interval to check the cache
      const checkCacheInterval = setInterval(() => {
        const cachedImg = imageCache.getFromCache(src);
        if (cachedImg) {
          setImageSrc(cachedImg.src);
          setImageLoaded(true);
          if (onLoad) onLoad();
          clearInterval(checkCacheInterval);
        }
      }, 100);
      
      // Cleanup interval on unmount or src change
      return () => {
        clearInterval(checkCacheInterval);
      };
    }
  }, [src, onLoad, preload, targetWidth, priority]);

  // Progressive loading transition
  const handleFullImageLoad = () => {
    setShowLowQuality(false);
  };

  return (
    <Box
      position="relative"
      width={styleProps.width}
      height={styleProps.height}
      display="flex"
      justifyContent="center"
      alignItems="center"
      onClick={onClick}
      sx={{
        aspectRatio: styleProps.aspectRatio,
        overflow: "hidden",
        cursor: onClick ? "pointer" : "default",
      }}
    >
      {/* Skeleton loader shown until any image is available */}
      {!imageLoaded && !showLowQuality && (
        <Skeleton
          variant="rectangular"
          width="100%"
          height="100%"
          animation="wave"
          sx={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
        />
      )}
      
      {/* Low quality image shown while main image loads */}
      {showLowQuality && lowQualitySrc && (
        <img
          src={lowQualitySrc}
          alt={`${alt} (low quality)`}
          style={{
            ...style,
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            filter: "blur(10px)",
            transform: "scale(1.1)", // Slightly larger to avoid blur edges
            opacity: imageLoaded ? 0 : 1,
            transition: "opacity 0.3s ease-in-out",
          }}
        />
      )}
      
      {/* Main image */}
      {imageSrc && (
        <img
          src={imageSrc}
          alt={alt}
          loading="lazy"
          onLoad={handleFullImageLoad}
          style={{
            ...style,
            opacity: imageLoaded ? 1 : 0,
            transition: "opacity 0.3s ease-in-out",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        />
      )}
    </Box>
  );
};

export default LazyImage;
