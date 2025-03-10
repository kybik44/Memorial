import { Box, Skeleton } from "@mui/material";
import { useState } from "react";
import OptimizedImage from "../optimized-image/OptimizedImage";

const ImageWithSkeleton = ({ src, alt, ...props }) => {
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
