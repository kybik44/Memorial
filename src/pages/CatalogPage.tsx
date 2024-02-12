import Box from "@mui/material/Box";
import catalogBg from "../assets/img/catalogBg.png";
import Breadcrumbs from "../components/molecules/breadcrumbs/Breadcrumbs";
import CatalogMenu from "../components/molecules/catalog-menu/CatalogMenu";
import CatalogList from "../components/molecules/catalog-list/CatalogList";
import CatalogItem from "../components/molecules/catalog-item/CatalogItem";

const styles = {
  container: {
    width: "100%",
    height: "100%",
    backgroundImage: `url("${catalogBg}")`,
    backgroundPosition: "top",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  },
  wrapper: {
    display: "flex",
    justifyContent: "flex-start",
  },
  info: {
    p: "50px",
  },
};

export const routesNameMap: { [key: string]: string } = {
  "/catalog/memorials": "Памятники",
  "/catalog/memorials/important": "Important",
  "/trash": "Trash",
  "/spam": "Spam",
  "/drafts": "Drafts",
};

const CatalogPage = () => {
  return (
    <Box sx={styles.container}>
      <Breadcrumbs />
      <Box sx={styles.wrapper}>
        <CatalogMenu />
        {/* <CatalogList /> */}
        <Box sx={styles.info}>
          <CatalogItem />
        </Box>
      </Box>
    </Box>
  );
};

export default CatalogPage;
