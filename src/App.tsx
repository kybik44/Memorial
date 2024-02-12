import {
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/molecules/header/Header";
import { theme } from "./core/theme";
import MainPage from "./pages/MainPage";
import CatalogPage from "./pages/CatalogPage";
import "./assets/fonts/stylesheet.css";

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <BrowserRouter basename="/">
          <CssBaseline />
          <Header />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/catalog" element={<CatalogPage />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
