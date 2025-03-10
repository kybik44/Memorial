import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Collapse, List } from "@mui/material";
import { FC, memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListLink from "./ListLink";
import styles from "./styles";
import { useCatalogContext } from "../../../contexts/CatalogContext";

interface MenuLinkProps {
  title: string;
  section: string;
  links: { title: string; to: string }[];
  isActive: boolean;
  onClose?: () => void;
}

const MenuLink: FC<MenuLinkProps> = memo(
  ({ title, section, links, isActive, onClose }) => {
    const navigate = useNavigate();
    const { fetchItems } = useCatalogContext();
    const [open, setOpen] = useState(isActive);

    useEffect(() => {
      if (isActive) {
        setOpen(true);
      }
    }, [isActive]);

    const handleCategoryClick = async (e: React.MouseEvent) => {
      e.stopPropagation();
      await fetchItems({ slug: section });
      navigate(`/catalog/${section}`);
      onClose?.();
    };

    const handleSubLinkClick = async (to: string) => {
      if (to && to !== "undefined") {
        await fetchItems({ slug: `${section}/${to}` });
        navigate(`/catalog/${section}/${to}`);
      }
    };

    const icon = links?.length ? open ? <ExpandLess /> : <ExpandMore /> : null;

    return (
      <>
        <ListLink
          title={title}
          icon={icon}
          onClick={handleCategoryClick}
          isActive={isActive}
        />
        {links && links.length > 0 && (
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List sx={styles.nestedList} disablePadding>
              {links.map((link) => (
                <ListLink
                  key={link.to}
                  title={link.title}
                  onClick={(e: any) => {
                    e.stopPropagation();
                    handleSubLinkClick(link.to);
                  }}
                  isNested
                />
              ))}
            </List>
          </Collapse>
        )}
      </>
    );
  }
);

MenuLink.displayName = "MenuLink";

export default MenuLink;
