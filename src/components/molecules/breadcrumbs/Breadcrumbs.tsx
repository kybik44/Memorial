import { Container } from "@mui/material";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { useLocation } from "react-router-dom";
import BreadcrumbsLink from "./BreadcrumbsLink";
import styles from "./styles";
import Text from "/components/atoms/text/Text";
import { useEffect, useState } from "react";
import { getCatalogList } from "/api/api";

interface RouteMap {
  [key: string]: string;
}

const RouterBreadcrumbs = () => {
  const location = useLocation();
  const [routesNameMap, setRoutesNameMap] = useState<RouteMap>({
    "/catalog": "Каталог",
  });

  useEffect(() => {
    const fetchCatalogList = async () => {
      try {
        const catalogList = await getCatalogList();
        if (catalogList) {
          const newRoutesNameMap: RouteMap = { "/catalog": "Каталог" };
          const processCategory = (category) => {
            const addCategoryToMap = (cat) => {
              newRoutesNameMap[`/catalog/${cat.full_slug}`] = cat.title;
              cat.children.forEach(addCategoryToMap);
            };
            addCategoryToMap(category);
          };
          catalogList.forEach(processCategory);
          setRoutesNameMap(newRoutesNameMap);
        }
      } catch (error) {
        console.error("Error fetching catalog data:", error);
      }
    };

    fetchCatalogList();
  }, []);

  const pathnames = location.pathname.split("/").filter((x) => x);
  const createBreadcrumbs = () =>
    pathnames.map((value, index) => {
      const last = index === pathnames.length - 1;
      const to = `/${pathnames.slice(0, index + 1).join("/")}`;
      const routeName = routesNameMap[to] || value;
      return (
        <span key={to} style={{ display: "flex", alignItems: "center" }}>
          <Text variant="body1" customColor="text.secondary">
            {" / "}
          </Text>
          {last ? (
            <Text
              variant="body1"
              customColor="text.secondary"
              fontWeight={700}
              fontStyle="italic"
              sx={styles.link}
            >
              {routeName}
            </Text>
          ) : (
            <BreadcrumbsLink to={to} sx={styles.link}>
              <Text variant="body1" customColor="text.secondary">
                {routeName}
              </Text>
            </BreadcrumbsLink>
          )}
        </span>
      );
    });

  return (
    <Breadcrumbs aria-label="breadcrumb" sx={styles.container}>
      <Container maxWidth="xl" sx={styles.content}>
        <BreadcrumbsLink to="/" sx={styles.link}>
          <Text variant="body1" customColor="text.secondary">
            Главная
          </Text>
        </BreadcrumbsLink>
        {createBreadcrumbs()}
      </Container>
    </Breadcrumbs>
  );
};

export default RouterBreadcrumbs;
