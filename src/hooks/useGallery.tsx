import { useEffect, useRef, useState } from "react";

const useGallery = (initialImages: string[] = []) => {
  const [open, setOpen] = useState<boolean>(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [images, setImages] = useState<string[]>(initialImages);
  const imageCache = useRef<Map<string, boolean>>(new Map());

  const preloadImage = (src: string) => {
    if (!imageCache.current.has(src)) {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        imageCache.current.set(src, true);
      };
    }
  };

  useEffect(() => {
    if (images.length > 0) {
      const currentImage = images[currentImageIndex];
      if (imageCache.current.has(currentImage)) {
        setLoading(false);
      } else {
        setLoading(true);
        preloadImage(currentImage);
        setLoading(false);
      }

      // Preload the previous and next images
      preloadImage(
        images[(currentImageIndex - 1 + images.length) % images.length]
      );
      preloadImage(images[(currentImageIndex + 1) % images.length]);
    }
  }, [currentImageIndex, images]);

  const handleImage = (index: number) => {
    setCurrentImageIndex(index);
    setOpen(true);
  };

  const handlePrev = () => {
    setCurrentImageIndex(
      (currentImageIndex - 1 + images.length) % images.length
    );
  };

  const handleNext = () => {
    setCurrentImageIndex((currentImageIndex + 1) % images.length);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return {
    open,
    currentImageIndex,
    loading,
    images,
    setImages,
    handleImage,
    handlePrev,
    handleNext,
    handleClose,
  };
};

export default useGallery;
