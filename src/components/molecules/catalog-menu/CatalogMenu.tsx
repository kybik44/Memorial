import Box from "@mui/material/Box";
import List from "@mui/material/List";
import { FC, useMemo } from "react";
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

  const currentSection = useMemo(() => {
    const paths = location.pathname.split("/").filter(Boolean);
    return paths[1] || "";
  }, [location]);

  if (!links || links.length === 0) {
    return null;
  }

  return (
    <Box sx={styles.container}>
      <Box sx={styles.wrapper}>
        <List sx={styles.list}>
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
    </Box>
  );
};

export default CatalogMenu;
