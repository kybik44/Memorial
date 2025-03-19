import SearchOffIcon from "@mui/icons-material/SearchOff";
import { Box, Button, Card, CircularProgress, Grid } from "@mui/material";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import noImage from "../../../assets/img/no-image.png";
import styles from "./styles";
import { CatalogListItem } from "/api/types";
import LazyImage from "/components/atoms/lazy-image/LazyImage";
import Text from "/components/atoms/text/Text";
import { useCatalogContext } from "/contexts/CatalogContext";

interface CatalogListProps {
  items?: CatalogListItem[];
  loadingItems?: boolean;
}

const CatalogList: FC<CatalogListProps> = ({ items = [], loadingItems }) => {
  const { section, subsectionOrId } = useParams();
  const navigate = useNavigate();
  const { currentCategory } = useCatalogContext();

  // Track the actual UI state to prevent flickering
  const [uiState, setUiState] = useState<"loading" | "empty" | "items">(
    loadingItems ? "loading" : items.length === 0 ? "empty" : "items"
  );

  // Use a ref to track the last non-loading state
  const lastNonLoadingStateRef = useRef<"empty" | "items">(
    items.length === 0 ? "empty" : "items"
  );

  // Use a ref to track if we're currently showing the loading state
  const isShowingLoadingRef = useRef(loadingItems);

  // Safer timeout handling with ref
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Update the UI state when props change, with smarter transitions
  useEffect(() => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (loadingItems) {
      // If we're transitioning to loading state, check if we need to show it
      if (!isShowingLoadingRef.current) {
        // Only show loading if it persists for more than a short time
        timeoutRef.current = setTimeout(() => {
          setUiState("loading");
          isShowingLoadingRef.current = true;
        }, 200);
      }
    } else {
      // We're no longer loading, update state immediately
      const newState = items.length === 0 ? "empty" : "items";
      lastNonLoadingStateRef.current = newState;

      // Small delay for smoother transition (appears more intentional)
      timeoutRef.current = setTimeout(() => {
        setUiState(newState);
        isShowingLoadingRef.current = false;
      }, 50);
    }

    // Cleanup timeout on unmount or before next effect run
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [loadingItems, items.length]);

  // Safety net - force UI update if loading persists too long
  useEffect(() => {
    // If we've been loading for more than 3 seconds, force show items or empty state
    if (uiState === "loading") {
      const safetyTimeout = setTimeout(() => {
        console.log("Safety timeout triggered - forcing non-loading state");
        setUiState(lastNonLoadingStateRef.current);
        isShowingLoadingRef.current = false;
      }, 3000);

      return () => clearTimeout(safetyTimeout);
    }
  }, [uiState]);

  const handleItemClick = useCallback(
    (id: number, category_slug?: string) => {
      const basePath = "/catalog";
      let url;

      // Save the current URL parameters to help with back navigation
      const currentPage =
        new URLSearchParams(window.location.search).get("page") || "1";

      if (category_slug && category_slug.trim() !== "") {
        url = `${basePath}/${category_slug}/${id}`;
      } else if (
        subsectionOrId &&
        subsectionOrId !== "undefined" &&
        isNaN(Number(subsectionOrId))
      ) {
        url = `${basePath}/${section}/${subsectionOrId}/${id}`;
      } else if (section && section !== "undefined") {
        url = `${basePath}/${section}/${id}`;
      } else if (currentCategory) {
        url = `${basePath}/${currentCategory.full_slug}/${id}`;
      } else {
        url = `${basePath}/${id}`;
      }

      // Store the current page in session storage to help with back navigation
      sessionStorage.setItem("lastCatalogPage", currentPage);

      navigate(url);
    },
    [section, subsectionOrId, currentCategory, navigate]
  );

  // Display based on the UI state
  if (uiState === "loading") {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "400px",
          width: "100%",
          gap: 2,
        }}
      >
        <CircularProgress size={40} />
        <Text variant="h5" mb={4}>
          Загрузка каталога...
        </Text>
      </Box>
    );
  }

  if (uiState === "empty") {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "300px",
          gap: 2,
          p: 3,
          backgroundColor: "background.paper",
          borderRadius: 2,
          boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
          m: {
            xs: 2,
            sm: 4,
            md: 6,
          },
        }}
      >
        <SearchOffIcon
          sx={{
            fontSize: {
              xs: "48px",
              sm: "64px",
              md: "72px",
            },
            color: "text.primary",
            opacity: 0.7,
          }}
        />
        <Text
          variant="h5"
          customColor="text.primary"
          sx={{
            textAlign: "center",
            fontWeight: 500,
            mb: 1,
          }}
        >
          Товары не найдены
        </Text>
        <Text
          variant="body1"
          customColor="text.primary"
          sx={{
            textAlign: "center",
            opacity: 0.8,
          }}
        >
          Попробуйте изменить параметры поиска или выбрать другую категорию
        </Text>
      </Box>
    );
  }

  return (
    <Grid
      container
      spacing={{ xs: 2, sm: 3, md: 4, lg: 6 }}
      sx={{
        ...styles.gridContainer,
        opacity: 1,
        transition: "opacity 0.3s ease-in-out",
      }}
    >
      {items.map((item, index) => (
        <Grid item key={item.id} xs={6} sm={6} md={4} lg={4} xl={3}>
          <Card
            sx={{
              ...styles.card,
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                ...styles.imageWrapper,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <LazyImage
                src={
                  (item?.images && item.images[index]?.thumbnail) ||
                  item.image ||
                  (item.images && item.images[0]?.image) ||
                  noImage
                }
                alt={item.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  aspectRatio: "1/1",
                }}
              />
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                padding: 2,
              }}
            >
              <Text variant="h5" component="div" sx={styles.cardTitle}>
                {item.title}
              </Text>
              {item.price && (
                <Text
                  variant="body2"
                  fontWeight={700}
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  {item.price} бел. р
                </Text>
              )}
              <Box sx={{ mt: "auto", pt: 2 }}>
                <Button
                  size="small"
                  sx={styles.button}
                  onClick={() => handleItemClick(item.id, item.category_slug)}
                  fullWidth
                >
                  Подробнее
                </Button>
              </Box>
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default CatalogList;
