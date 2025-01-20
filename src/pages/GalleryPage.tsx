import { Box, Container, Theme, useMediaQuery } from "@mui/material";
import Text from "/components/atoms/text/Text";
import { theme } from "/core/theme";
import { GalleryPageProvider } from "/contexts/GalleryPageContext";
import Gallery from "/components/organisms/gallery/Gallery";
import { useLocation } from "react-router-dom";

const initStyles = {
  container: {
    width: "100%",
    minHeight: "100vh",
    paddingTop: [4, 8, 12],
    [theme.breakpoints.down("sm")]: {
      minHeight: "100%",
    },
  },
};

const GalleryPage = () => {
  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );
  const location = useLocation();
  const initialWorks = location.state?.ourWorks || [];

  return (
    <GalleryPageProvider initialWorks={initialWorks}>
      <Box sx={initStyles.container}>
        <Container maxWidth="xl" sx={{ paddingBottom: "40px" }}>
          <Text
            variant={isSmallScreen ? "h2" : "h1"}
            multiline
            sx={{ marginBottom: "20px" }}
          >
            Все работы
          </Text>
          <Gallery />
        </Container>
      </Box>
    </GalleryPageProvider>
  );
};

export default GalleryPage;
