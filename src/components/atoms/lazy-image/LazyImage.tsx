import { useState, useEffect } from 'react';
import { Box, Skeleton } from '@mui/material';

interface LazyImageProps {
  src: string;
  alt: string;
  style?: React.CSSProperties;
}

const LazyImage = ({ src, alt, style }: LazyImageProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState<string>('');

  useEffect(() => {
    const img = new Image();
    
    // Добавляем явные размеры для предотвращения CLS
    const width = style?.width || '100%';
    const height = style?.height || 'auto';
    const aspectRatio = style?.aspectRatio || 'auto';

    img.onload = () => {
      setImageSrc(src);
      setImageLoaded(true);
    };

    img.src = src;
    
    return () => {
      img.onload = null;
    };
  }, [src, style]);

  return (
    <Box 
      position="relative" 
      width={style?.width || '100%'}
      height={style?.height || 'auto'}
      display="flex" 
      justifyContent="center" 
      alignItems="center"
      sx={{ aspectRatio: style?.aspectRatio || 'auto' }}
    >
      {!imageLoaded && (
        <Skeleton
          variant="rectangular"
          width="100%"
          height="100%"
          animation="wave"
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
          }}
          width={style?.width}
          height={style?.height}
        />
      )}
    </Box>
  );
};

export default LazyImage; 