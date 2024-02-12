import Breadcrumbs from "@mui/material/Breadcrumbs";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useLocation } from "react-router-dom";
import { routesNameMap } from "../../../pages/CatalogPage";
import BreadcrumbsLink from "./BreadcrumbsLink";
import styles from "./styles";

const RouterBreadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <Breadcrumbs aria-label="breadcrumb" sx={styles.container}>
      <Container maxWidth="xl" sx={styles.content}>
        <BreadcrumbsLink underline="hover" color="inherit" to="/">
          Главная / Каталог
        </BreadcrumbsLink>
        {pathnames.map((value, index) => {
          const last = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;

          return last ? (
            <Typography color="text.primary" key={to}>
              {routesNameMap[to]}
            </Typography>
          ) : (
            <BreadcrumbsLink underline="hover" color="inherit" to={to} key={to}>
              {routesNameMap[to]}
            </BreadcrumbsLink>
          );
        })}
      </Container>
    </Breadcrumbs>
  );
};
export default RouterBreadcrumbs;
