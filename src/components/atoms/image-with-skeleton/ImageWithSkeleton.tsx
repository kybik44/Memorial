import { Box, Skeleton } from "@mui/material";
import { useState, FC } from "react";
import OptimizedImage from "../optimized-image/OptimizedImage";

interface ImageWithSkeletonProps {
  src: string;
  alt: string;
  [key: string]: any;
}

const ImageWithSkeleton: FC<ImageWithSkeletonProps> = ({ src, alt, ...props }) => {
  const [loading, setLoading] = useState(true);

  return (
    <Box position="relative">
      {loading && (
        <Skeleton
          variant="rectangular"
          width="100%"
          height="100%"
          animation="wave"
          sx={{ position: "absolute" }}
        />
      )}
      <OptimizedImage
        src={src}
        alt={alt}
        onLoad={() => setLoading(false)}
        style={{ opacity: loading ? 0 : 1 }}
        {...props}
      />
    </Box>
  );
};

export default ImageWithSkeleton;
