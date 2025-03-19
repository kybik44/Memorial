import { FC, memo } from 'react';
import Image from 'mui-image';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  duration?: number;
  [key: string]: any;
}

const OptimizedImage: FC<OptimizedImageProps> = memo(({ src, alt, width, height, ...props }) => {
  // Получаем WebP версию изображения если она есть
  const webpSrc = src.replace(/\.(jpg|png)$/, '.webp');

  return (
    <picture>
      <source srcSet={webpSrc} type="image/webp" />
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        duration={0}
        {...props}
      />
    </picture>
  );
});

export default OptimizedImage; 