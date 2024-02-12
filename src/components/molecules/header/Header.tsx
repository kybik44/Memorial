import MenuIcon from "@mui/icons-material/Menu";
import PhoneIcon from "@mui/icons-material/Phone";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Drawer from "@mui/material/Drawer";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import { Theme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import * as React from "react";
import { useState } from "react";
import styles from "./styles.ts";
import logo from "/assets/img/logo.png";
import LabelDropdown from "/components/atoms/label-dropdown/LabelDropdown.tsx";
import Text from "/components/atoms/text/Text.tsx";

const pages = [
  "Главная",
  "Виды гранита",
  "Памятники",
  "Оформление и декор",
  "Благоустройство и ограды",
  "Наши работы",
  "Контакты",
];
const pagesMonuments = ["Главная", "Виды гранита", "Памятники"];
const pagesDecor = ["Главная333", "Виды гранитаfasf", "Памятники333"];
const pagesFences = ["Главнаяafs", "Виды гранита12", "Памятникиfas"];

enum DropdownPages {
  MONUMENTS = "Памятники",
  DECOR = "Оформление и декор",
  FENCES = "Благоустройство и ограды",
}

const ResponsiveAppBar = () => {
  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("md")
  );
  const [open, setOpen] = useState(false);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setOpen(open);
    };

  const handleClick = () => {
    setOpen(false);
  };

  const linkItem = (page: string) => (
    <Link
      key={page}
      onClick={handleClick}
      underline="hover"
      sx={styles.navItem}
    >
      <Text variant="body1" multiline={false} sx={styles.linkText}>
        {page}
      </Text>
    </Link>
  );

  const renderMenuItems = (page: string) => {
    if (
      page === DropdownPages.MONUMENTS ||
      page === DropdownPages.DECOR ||
      page === DropdownPages.FENCES
    ) {
      const dropdownContent = (
        <Stack rowGap={"30px"} sx={{ pt: "20px", pl: "20px" }}>
          {page === DropdownPages.MONUMENTS &&
            pagesMonuments.map((page) => linkItem(page))}
          {page === DropdownPages.DECOR &&
            pagesDecor.map((page) => linkItem(page))}
          {page === DropdownPages.FENCES &&
            pagesFences.map((page) => linkItem(page))}
        </Stack>
      );
      return (
        <LabelDropdown key={page} label={page} content={dropdownContent} />
      );
    }
    return (
      <Link
        key={page}
        onClick={handleClick}
        underline="hover"
        sx={styles.navItem}
      >
        <Text variant="body1" multiline={false} sx={styles.linkText}>
          {page}
        </Text>
      </Link>
    );
  };

  return (
    <AppBar color="inherit" position="static" sx={styles.container}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <Box
            component="img"
            sx={{
              maxWidth: "146px",
              height: "auto",
              padding: 0,
              mr: 4,
            }}
            alt="logo"
            src={logo}
          />
          {isSmallScreen && <MenuIcon onClick={toggleDrawer(true)} />}
          <Drawer
            anchor={"right"}
            open={open}
            onClose={toggleDrawer(false)}
            PaperProps={{ sx: styles.drawer }}
          >
            <Stack rowGap={"30px"}>
              {pages.map((page) => renderMenuItems(page))}
            </Stack>
          </Drawer>
          <Box
            sx={{
              flexGrow: 1,
              justifyContent: "space-between",
              display: { xs: "none", md: "flex" },
            }}
          >
            {pages.map((page) => (
              <Link
                key={page}
                onClick={handleClick}
                underline="hover"
                sx={styles.navItem}
              >
                <Text variant="body1" multiline={false}>
                  {page}
                </Text>
              </Link>
            ))}
            <Link sx={styles.phone} href="tel:+375446781789">
              <PhoneIcon />
              <Text variant="h5" ml={1}>
                +375 44 678 17 89
              </Text>
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
