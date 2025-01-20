import Box from "@mui/material/Box";
import List from "@mui/material/List";
import { FC, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MenuLink from "./MenuLink";
import styles from "./styles";

export interface CatalogMenuItem {
  title: string;
  to?: string;
  links?: Array<CatalogMenuItem>;
  section?: string;
}

interface ICatalogMenu {
  linksList: Array<CatalogMenuItem>;
}

const CatalogMenu: FC<ICatalogMenu> = ({ linksList }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleMenuClick = (link: CatalogMenuItem) => {
    if (link.to) {
      navigate(`/catalog/${link.section}/${link.to}`);
    }
  };

  const firstLink = useMemo(
    () => linksList.find((link) => link.to),
    [linksList]
  );

  useEffect(() => {
    const matchingLink = linksList.find(
      (link) => link.to === location.pathname
    );

    if (!matchingLink && firstLink?.to) {
      navigate(firstLink.to);
    }
  }, [location.pathname, linksList, navigate, firstLink]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box sx={styles.menu} component="nav" aria-label="mailbox folders">
        <List>
          {linksList.map((link) => (
            <MenuLink
              key={link.title}
              link={link}
              handleClick={() => handleMenuClick(link)}
              selected={link.to === location.pathname}
            />
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default CatalogMenu;
