import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import PhoneIcon from "@mui/icons-material/Phone";
import { IconButton, Theme, Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Drawer from "@mui/material/Drawer";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import useMediaQuery from "@mui/material/useMediaQuery";
import { SystemStyleObject } from "@mui/system/styleFunctionSx/styleFunctionSx";
import { FC, KeyboardEvent, MouseEvent, useState } from "react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import styles from "./styles";
import logo from "../../../assets/img/logo.png";
import Text from "../../../components/atoms/text/Text";

const pages = [
  { name: "Виды гранита", href: "#granite" },
  { name: "Памятники", href: "#kinds" },
  { name: "Оформление и декор", href: "#decor" },
  { name: "Благоустройство и ограды", href: "#fences" },
  { name: "Наши работы", href: "#gallery" },
  { name: "Контакты", href: "#map" },
];

const Header: FC = () => {
  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("md")
  );
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleDrawer =
    (open: boolean) => (event: KeyboardEvent | MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as KeyboardEvent).key === "Tab" ||
          (event as KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setOpen(open);
    };

  const handleClick = () => setOpen(false);

  const handlePageClick = (href: string) => {
    navigate("/", { state: { scrollTo: href } });
  };

  const linkItem = (page: { name: string; href: string }) => (
    <RouterLink
      key={page.name}
      to="#"
      onClick={(e) => {
        e.preventDefault();
        handleClick();
        handlePageClick(page.href);
      }}
      style={{
        textDecoration: "none",
        color: "inherit",
      }}
    >
      <Text variant="body2" sx={styles.linkText} fontWeight={600}>
        {page.name}
      </Text>
    </RouterLink>
  );

  return (
    <AppBar color="inherit" position="sticky" sx={styles.container}>
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{ justifyContent: "space-between", alignItems: "center" }}
        >
          <Box
            component="img"
            sx={{ maxWidth: "146px", height: "auto", mr: 4 }}
            alt="logo"
            src={logo}
          />
          {isSmallScreen && <MenuIcon onClick={toggleDrawer(true)} />}
          <Drawer
            anchor="right"
            open={open}
            onClose={toggleDrawer(false)}
            keepMounted={false}
            SlideProps={{
              appear: true,
              timeout: 300,
            }}
            sx={{
              "& .MuiDrawer-paper": styles.drawer as SystemStyleObject<Theme>,
            }}
          >
            <AppBar position="sticky" color="default" elevation={0}>
              <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                  Меню
                </Typography>
                <IconButton
                  edge="end"
                  onClick={toggleDrawer(false)}
                  aria-label="закрыть меню"
                >
                  <CloseIcon />
                </IconButton>
              </Toolbar>
            </AppBar>

            <Stack spacing={3} sx={{ mt: 2 }}>
              <RouterLink
                to={location.pathname === "/" ? "/catalog" : "/"}
                onClick={handleClick}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Text variant="body2" sx={styles.linkText} fontWeight={600}>
                  {location.pathname === "/" ? "Каталог" : "Главная"}
                </Text>
              </RouterLink>
              {pages.map((page) => linkItem(page))}
            </Stack>
          </Drawer>
          <Box
            sx={{
              flexGrow: 1,
              justifyContent: "space-between",
              alignItems: "center",
              display: { xs: "none", md: "flex" },
            }}
          >
            <RouterLink
              to={location.pathname === "/" ? "/catalog" : "/"}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Text variant="body1" sx={styles.linkText} fontWeight={600}>
                {location.pathname === "/" ? "Каталог" : "Главная"}
              </Text>
            </RouterLink>
            {pages.map((page) => (
              <RouterLink
                key={page.name}
                to="#"
                onClick={(e) => {
                  e.preventDefault();
                  handlePageClick(page.href);
                }}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Text variant="body1" sx={styles.linkText} fontWeight={600}>
                  {page.name}
                </Text>
              </RouterLink>
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

export default Header;
