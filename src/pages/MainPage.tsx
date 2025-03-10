import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Advantages from "../components/organisms/advantages/Advantages";
import Decor from "../components/organisms/decor/Decor";
import Description from "../components/organisms/description/Description";
import Fences from "../components/organisms/fences/Fences";
import Gallery from "../components/organisms/gallery/Gallery";
import Granite from "../components/organisms/granite/Granite";
import Head from "../components/organisms/head/Head";
import Kinds from "../components/organisms/kinds/Kinds";
import Map from "../components/organisms/map/Map";
import Questions from "../components/organisms/questions/Questions";
import {
  MainPageProvider,
  useMainPageContext,
} from "/contexts/MainPageContext";

const MainPage = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.scrollTo) {
      const anchor = document.querySelector(location.state.scrollTo);
      if (anchor) {
        anchor.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [location]);

  return (
    <MainPageProvider>
      <MainContent />
    </MainPageProvider>
  );
};

const MainContent = () => {
  const { mainPageData, loading, error } = useMainPageContext();

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        height="70vh"
        py={8}
      >
        <Typography variant="h3" mb={4}>
          Загрузка...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  if (!mainPageData) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Typography variant="h6" color="textSecondary">
          No data available.
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <Head />
      <Description />
      <div id="granite">
        <Granite />
      </div>
      <Advantages />
      <div id="kinds">
        <Kinds />
      </div>
      <div id="decor">
        <Decor />
      </div>
      <div id="fences">
        <Fences />
      </div>
      <div id="gallery">
        <Gallery isMainPage />
      </div>
      <div id="map">
        <Map />
      </div>
      <Questions />
    </>
  );
};

export default MainPage;
