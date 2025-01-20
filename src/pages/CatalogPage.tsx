import { Box, useMediaQuery } from "@mui/material";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Theme } from "@mui/material/styles";
import catalogBg from "../assets/img/catalogBg.png";
import Breadcrumbs from "../components/molecules/breadcrumbs/Breadcrumbs";
import CatalogItem from "../components/molecules/catalog-item/CatalogItem";
import CatalogList from "../components/molecules/catalog-list/CatalogList";
import CatalogMenu, {
  CatalogMenuItem,
} from "../components/molecules/catalog-menu/CatalogMenu";
import { getCatalogList, getCatalogDetails, getItemsList } from "/api/api";
import { theme } from "../core/theme";

const styles = {
  container: {
    width: "100%",
    minHeight: "100vh",
    backgroundImage: `url("${catalogBg}")`,
    backgroundPosition: "top",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    [theme.breakpoints.down("sm")]: {
      minHeight: "100%",
    },
  },
  wrapper: {
    display: "flex",
    justifyContent: "flex-start",
    gap: "20px",
  },
};

const CatalogPage = () => {
  const { section, subsection, productId } = useParams<{
    section: string;
    subsection: string;
    productId: string;
  }>();
  const [items, setItems] = useState<any[]>([]);
  const [linksList, setLinksList] = useState<CatalogMenuItem[]>([]);
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("md")
  );

  useEffect(() => {
    const fetchCatalogList = async () => {
      try {
        const catalogList = await getCatalogList();
        if (catalogList) {
          const formattedLinksList = catalogList.map((category) => ({
            title: category.title,
            section: category.slug,
            links: category.children.map((child) => ({
              title: child.title,
              to: child.slug,
            })),
          }));
          setLinksList(formattedLinksList);
        }
      } catch (error) {
        console.error("Error fetching catalog data:", error);
      }
    };

    const fetchItems = async () => {
      try {
        if (productId) {
          const itemDetails = await getCatalogDetails(Number(productId));
          setItems(itemDetails ? [itemDetails] : []);
        } else {
          const itemsList = await getItemsList(1);
          setItems(itemsList.results || []);
        }
      } catch (error) {
        console.error("Error fetching items data:", error);
      }
    };

    fetchCatalogList();
    fetchItems();
  }, [section, subsection, productId]);

  return (
    <Box sx={styles.container}>
      <Breadcrumbs />
      <Box sx={styles.wrapper}>
        {!isMobile && <CatalogMenu linksList={linksList} />}
        {productId ? (
          <CatalogItem productId={productId} />
        ) : items.length > 0 ? (
          <CatalogList catalogItems={items} />
        ) : null}
      </Box>
    </Box>
  );
};

export default CatalogPage;
