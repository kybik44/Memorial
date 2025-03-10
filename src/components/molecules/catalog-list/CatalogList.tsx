import { Box, Button, Card, Grid } from "@mui/material";
import { FC, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import noImage from "../../../assets/img/no-image.png";
import styles from "./styles";
import { CatalogListItem } from "/api/types";
import LazyImage from "/components/atoms/lazy-image/LazyImage";
import Text from "/components/atoms/text/Text";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import { useCatalogContext } from "/contexts/CatalogContext";

interface CatalogListProps {
  items?: CatalogListItem[];
  loadingItems?: boolean;
}

const CatalogList: FC<CatalogListProps> = ({ items = [], loadingItems }) => {
  const { section, subsectionOrId } = useParams();
  const navigate = useNavigate();
  const { currentCategory } = useCatalogContext();

  const handleItemClick = useCallback((id: number, category_slug?: string) => {
    const basePath = "/catalog";
    let url;

    if (category_slug && category_slug.trim() !== '') {
      url = `${basePath}/${category_slug}/${id}`;
      console.log(`Navigating to: ${url} (using category_slug)`);
    } else if (
      subsectionOrId &&
      subsectionOrId !== "undefined" &&
      isNaN(Number(subsectionOrId))
    ) {
      url = `${basePath}/${section}/${subsectionOrId}/${id}`;
      console.log(`Navigating to: ${url} (using section/subsection)`);
    } else if (section && section !== "undefined") {
      url = `${basePath}/${section}/${id}`;
      console.log(`Navigating to: ${url} (using section)`);
    } else if (currentCategory) {
      url = `${basePath}/${currentCategory.full_slug}/${id}`;
      console.log(`Navigating to: ${url} (using currentCategory)`);
    } else {
      url = `${basePath}/${id}`;
      console.log(`Navigating to: ${url} (using id only)`);
    }

    navigate(url);
  }, [section, subsectionOrId, currentCategory, navigate]);

  if (!loadingItems && (!items || items.length === 0)) {
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
        opacity: loadingItems ? 0.7 : 1,
        transition: "opacity 0.3s ease-in-out",
      }}
    >
      {items.map((item) => (
        <Grid item key={item.id} xs={6} sm={6} md={4} lg={4} xl={3}>
          <Card
            sx={{
              ...styles.card,
              height: "100%", // Фиксированная высота для карточки
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
