import { useState, useEffect, useMemo } from 'react';
import { Box, Skeleton } from '@mui/material';

interface LazyImageProps {
  src: string;
  alt: string;
  style?: React.CSSProperties;
  onLoad?: () => void;
}

const LazyImage = ({ src, alt, style, onLoad }: LazyImageProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState<string>('');

  // Memoize style properties to prevent unnecessary re-renders
  const styleProps = useMemo(() => {
    return {
      width: style?.width || '100%',
      height: style?.height || 'auto',
      aspectRatio: style?.aspectRatio || '1/1', // Default aspect ratio to prevent layout shifts
    };
  }, [style?.width, style?.height, style?.aspectRatio]);

  useEffect(() => {
    // Reset state when src changes
    setImageLoaded(false);
    
    const img = new Image();
    
    img.onload = () => {
      setImageSrc(src);
      setImageLoaded(true);
      // Вызываем пользовательский обработчик onLoad, если он предоставлен
      if (onLoad) {
        onLoad();
      }
    };

    img.src = src;
    
    return () => {
      img.onload = null;
    };
  }, [src, onLoad]);

  return (
    <Box 
      position="relative" 
      width={styleProps.width}
      height={styleProps.height}
      display="flex" 
      justifyContent="center" 
      alignItems="center"
      sx={{ 
        aspectRatio: styleProps.aspectRatio,
        overflow: 'hidden',
      }}
    >
      {!imageLoaded && (
        <Skeleton
          variant="rectangular"
          width="100%"
          height="100%"
          animation="wave"
          sx={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
        />
      )}
      {imageSrc && (
        <img
          src={imageSrc}
          alt={alt}
          loading="lazy"
          style={{
            ...style,
            opacity: imageLoaded ? 1 : 0,
            transition: 'opacity 0.3s ease-in-out',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        />
      )}
    </Box>
  );
};

export default LazyImage; 