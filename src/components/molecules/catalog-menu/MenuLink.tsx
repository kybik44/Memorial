import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { List } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { FC, memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCatalogContext } from "../../../contexts/CatalogContext";
import ListLink from "./ListLink";
import styles from "./styles";

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

      const newUrl = `/catalog/${section}`;
      window.history.replaceState({ path: newUrl }, "", newUrl);

      const event = new CustomEvent("urlChanged", { detail: { path: newUrl } });
      window.dispatchEvent(event);

      onClose?.();
    };

    const handleIconClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (links && links.length > 0) {
        setOpen(!open);
      }
    };

    const handleSubLinkClick = (to: string) => async (e: React.MouseEvent) => {
      e.stopPropagation();
      if (to && to !== "undefined") {
        await fetchItems({ slug: `${section}/${to}` });

        const newUrl = `/catalog/${section}/${to}`;
        window.history.replaceState({ path: newUrl }, "", newUrl);

        const event = new CustomEvent("urlChanged", {
          detail: { path: newUrl },
        });
        window.dispatchEvent(event);

        onClose?.();
      }
    };

    // Создаем иконку с обработчиком клика
    const icon = links?.length ? (
      <span
        onClick={handleIconClick}
        style={{ cursor: "pointer", padding: "8px" }}
      >
        {open ? <ExpandLess /> : <ExpandMore />}
      </span>
    ) : null;

    return (
      <>
        <ListLink
          title={title}
          icon={icon}
          onClick={handleCategoryClick}
          isActive={isActive}
        />
        <AnimatePresence initial={false}>
          {links && links.length > 0 && open && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              style={{ overflow: "hidden" }}
            >
              <List sx={styles.nestedList} disablePadding>
                {links.map((link) => (
                  <ListLink
                    key={link.to}
                    title={link.title}
                    onClick={handleSubLinkClick(link.to)}
                    isNested
                  />
                ))}
              </List>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }
);

MenuLink.displayName = "MenuLink";

export default MenuLink;
