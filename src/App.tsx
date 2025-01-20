import {
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./assets/fonts/stylesheet.css";
import Header from "./components/molecules/header/Header";
import { theme } from "./core/theme";
import CatalogPage from "./pages/CatalogPage";
import MainPage from "./pages/MainPage";
import Footer from "./components/molecules/footer/Footer";
import GalleryPage from "./pages/GalleryPage";

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter basename="/">
          <Header />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/catalog/:section" element={<CatalogPage />} />
            <Route
              path="/catalog/:section/:subsection"
              element={<CatalogPage />}
            />
            <Route
              path="/catalog/:section/:subsection/:productId"
              element={<CatalogPage />}
            />
          </Routes>
          <Footer />
        </BrowserRouter>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
