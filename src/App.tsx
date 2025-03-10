import {
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./assets/fonts/stylesheet.css";
import Header from "./components/molecules/header/Header";
import { theme } from "./core/theme";
import CatalogPage from "./pages/CatalogPage";
import MainPage from "./pages/MainPage";
import Footer from "./components/molecules/footer/Footer";
import GalleryPage from "./pages/GalleryPage";
import { useEffect } from 'react';
import PageTransition from "./components/animations/PageTransition";

function App() {
  useEffect(() => {
    // Функция для предзагрузки изображения
    const preloadImage = (src: string) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = resolve;
        img.onerror = reject;
      });
    };

    // Функция для предзагрузки всех изображений на странице
    const preloadImages = () => {
      const images = document.querySelectorAll('img');
      const sources = Array.from(images).map(img => img.src);
      return Promise.all(sources.map(preloadImage));
    };

    preloadImages();
  }, []);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter basename="/">
          <Header />
          <PageTransition>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/catalog" element={<CatalogPage />} />
              <Route path="/catalog/:section" element={<CatalogPage />} />
              <Route path="/catalog/:section/:subsectionOrId" element={<CatalogPage />} />
              <Route path="/catalog/:section/:subsection/:productId" element={<CatalogPage />} />
              <Route path="/catalog/*" element={<Navigate to="/catalog" replace />} />
            </Routes>
          </PageTransition>
          <Footer />
        </BrowserRouter>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;