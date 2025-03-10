import Box from "@mui/material/Box";
import List from "@mui/material/List";
import { FC, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import MenuLink from "./MenuLink";
import styles from "./styles";

export interface CatalogMenuItem {
  title: string;
  section: string;
  links: { title: string; to: string }[];
}

interface CatalogMenuProps {
  links?: CatalogMenuItem[];
}

const CatalogMenu: FC<CatalogMenuProps> = ({ links = [] }) => {
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  const currentSection = useMemo(() => {
    const paths = currentPath.split("/").filter(Boolean);
    return paths[1] || "";
  }, [currentPath]);

  useEffect(() => {
    const handleUrlChanged = () => {
      setCurrentPath(window.location.pathname);
    };

    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener("urlChanged", handleUrlChanged as EventListener);
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener(
        "urlChanged",
        handleUrlChanged as EventListener
      );
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  if (!links || links.length === 0) {
    return null;
  }

  return (
    <Box sx={styles.menuContainer}>
      <List sx={styles.menu}>
        {links.map((item) => (
          <MenuLink
            key={item.section}
            title={item.title}
            section={item.section}
            links={item.links}
            isActive={currentSection === item.section}
          />
        ))}
      </List>
    </Box>
  );
};

export default CatalogMenu;
