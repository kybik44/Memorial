import { useEffect, useRef, useState, useCallback } from "react";
import { OurWorks } from "/api/types";

const useGallery = (initialImages: OurWorks[] = []) => {
  const [open, setOpen] = useState<boolean>(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [images, setImages] = useState<string[]>([]);
  const imageCache = useRef<Map<string, boolean>>(new Map());
  
  // Store the images in a ref to avoid dependency issues
  const imagesRef = useRef<string[]>([]);
  useEffect(() => {
    imagesRef.current = images;
  }, [images]);

  // Stable version of the preloadImage function that doesn't depend on state
  const preloadImage = useCallback((src: string) => {
    return new Promise<void>((resolve) => {
      if (imageCache.current.has(src)) {
        resolve();
        return;
      }
      
      const img = new Image();
      img.src = src;
      img.onload = () => {
        imageCache.current.set(src, true);
        resolve();
      };
      img.onerror = () => {
        // Still resolve even on error to prevent hanging
        resolve();
      };
    });
  }, []);

  // Handle image loading when currentImageIndex changes
  useEffect(() => {
    let isMounted = true;
    
    const loadCurrentImage = async () => {
      const currentImages = imagesRef.current;
      if (currentImages.length === 0) return;
      
      const currentImage = currentImages[currentImageIndex];
      if (!currentImage) return;
      
      if (!imageCache.current.has(currentImage)) {
        if (isMounted) setLoading(true);
        
        await preloadImage(currentImage);
        
        if (isMounted) setLoading(false);
      }
      
      // Preload adjacent images without affecting loading state
      if (currentImages.length > 1) {
        const prevIndex = (currentImageIndex - 1 + currentImages.length) % currentImages.length;
        const nextIndex = (currentImageIndex + 1) % currentImages.length;
        
        Promise.all([
          preloadImage(currentImages[prevIndex]),
          preloadImage(currentImages[nextIndex])
        ]).catch(() => {
          // Ignore preloading errors
        });
      }
    };
    
    loadCurrentImage();
    
    return () => {
      isMounted = false;
    };
  }, [currentImageIndex, preloadImage]);

  // Stable setImages function with memoization
  const setImagesStable = useCallback((newImages: string[]) => {
    // Use a functional update to avoid dependency on current state
    setImages(prev => {
      // Only update if the images have actually changed
      if (JSON.stringify(prev) === JSON.stringify(newImages)) {
        return prev;
      }
      return newImages;
    });
  }, []);

  // Load initial images only once
  useEffect(() => {
    if (initialImages.length > 0) {
      const imageUrls = initialImages.map((work) => work.image);
      setImagesStable(imageUrls);
    }
  }, [initialImages, setImagesStable]);

  const handleImage = useCallback((index: number) => {
    setCurrentImageIndex(index);
    setOpen(true);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentImageIndex(prevIndex => {
      const currentImages = imagesRef.current;
      return (prevIndex - 1 + currentImages.length) % currentImages.length;
    });
  }, []);

  const handleNext = useCallback(() => {
    setCurrentImageIndex(prevIndex => {
      const currentImages = imagesRef.current;
      return (prevIndex + 1) % currentImages.length;
    });
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  return {
    open,
    currentImageIndex,
    loading,
    images,
    setImages: setImagesStable,
    handleImage,
    handlePrev,
    handleNext,
    handleClose,
  };
};

export default useGallery;
