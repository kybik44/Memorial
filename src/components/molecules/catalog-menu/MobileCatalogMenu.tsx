import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  Theme,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { SystemStyleObject } from "@mui/system/styleFunctionSx/styleFunctionSx";
import { FC, useRef, useState, useEffect, useMemo } from "react";
import headerStyles from "../header/styles";
import { CatalogMenuItem } from "./CatalogMenu";
import MenuLink from "./MenuLink";

interface MobileCatalogMenuProps {
  links: CatalogMenuItem[];
}

const MobileCatalogMenu: FC<MobileCatalogMenuProps> = ({ links }) => {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  // Определяем текущую секцию на основе пути
  const currentSection = useMemo(() => {
    const paths = currentPath.split("/").filter(Boolean);
    return paths[1] || "";
  }, [currentPath]);

  // Обновляем текущий путь при изменении URL
  useEffect(() => {
    const handleUrlChanged = () => {
      setCurrentPath(window.location.pathname);
    };

    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('urlChanged', handleUrlChanged as EventListener);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('urlChanged', handleUrlChanged as EventListener);
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setIsOpen(open);
    };

  const handleClose = () => {
    setIsOpen(false);
    // Возвращаем фокус на кнопку меню при закрытии
    menuButtonRef.current?.focus();
  };

  return (
    <>
      <IconButton
        ref={menuButtonRef}
        edge="start"
        color="inherit"
        aria-label="открыть меню каталога"
        onClick={toggleDrawer(true)}
        sx={{
          position: "fixed",
          bottom: theme.spacing(2),
          right: theme.spacing(2),
          zIndex: 1000,
          backgroundColor: "primary.main",
          color: "white",
          boxShadow: 3,
          "&:hover": {
            backgroundColor: "primary.dark",
          },
        }}
      >
        <MenuIcon />
      </IconButton>

      <Drawer
        anchor="left"
        open={isOpen}
        onClose={handleClose}
        keepMounted={false}
        SlideProps={{
          appear: true,
          timeout: 300,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)"
        }}
        sx={{
          "& .MuiDrawer-paper": headerStyles.drawer as SystemStyleObject<Theme>,
        }}
      >
        <AppBar position="sticky" color="default" elevation={0}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Каталог
            </Typography>
            <IconButton
              edge="end"
              onClick={handleClose}
              aria-label="закрыть меню каталога"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        <Box
          role="navigation"
          aria-label="меню каталога"
          sx={{
            flex: 1,
            overflowY: "auto",
            mt: 2,
          }}
        >
          <List component="nav">
            {links.map((item) => (
              <MenuLink
                key={item.section}
                title={item.title}
                section={item.section}
                links={item.links}
                isActive={currentSection === item.section}
                onClose={handleClose}
              />
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default MobileCatalogMenu;
