import { Box } from "@mui/material";
import MuiBreadcrumbs from "@mui/material/Breadcrumbs";
import { FC } from "react";
import { Link as RouterLink } from "react-router-dom";
import styles from "./styles";
import Text from "/components/atoms/text/Text";

const GalleryBreadcrumbs: FC = () => {
  const breadcrumbs = [
    { title: "Главная", to: "/" },
    { title: "Галерея", to: "/gallery" },
  ];

  return (
    <Box sx={styles.wrapper}>
      <Box sx={styles.container}>
        <MuiBreadcrumbs
          separator="›"
          aria-label="breadcrumb"
          sx={{
            "& .MuiBreadcrumbs-separator": {
              color: "text.secondary",
              margin: "0 8px",
              fontSize: "16px",
            },
            "& .MuiBreadcrumbs-ol": {
              flexWrap: "nowrap",
              whiteSpace: "nowrap",
              overflow: "auto",
              msOverflowStyle: "none",
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": {
                display: "none",
              },
            },
          }}
        >
          {breadcrumbs.map((item, index) => {
            const isLast = index === breadcrumbs.length - 1;

            return (
              <span key={item.to}>
                {isLast ? (
                  <Text
                    variant="body1"
                    customColor="text.primary"
                    sx={{
                      ...styles.link,
                      ...styles.last,
                    }}
                  >
                    {item.title}
                  </Text>
                ) : (
                  <RouterLink
                    to={item.to}
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                    }}
                  >
                    <Text variant="body1" customColor="text.secondary">
                      {item.title}
                    </Text>
                  </RouterLink>
                )}
              </span>
            );
          })}
        </MuiBreadcrumbs>
      </Box>
    </Box>
  );
};

export default GalleryBreadcrumbs; 