import { SxProps, Theme } from "@mui/material/styles";
import { theme } from "/core/theme";

const styles: Record<string, SxProps<Theme>> = {
  container: {
    backgroundColor: "white",
    boxShadow: "none",
    borderBottom: "1px solid",
    borderColor: "divider",
  },
  drawer: {
    width: {
      xs: "85%",
      sm: "360px",
    },
    maxWidth: "360px",
    height: "100%",
    boxSizing: "border-box",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  links: {
    justifyContent: "space-evenly",
  },
  navItem: {
    display: "flex",
    p: 0,
    mr: 2,
    textTransform: "uppercase",
    cursor: "pointer",
    [theme.breakpoints.down("sm")]: {
      maxWidth: "280px",
    },
  },
  linkText: {
    textTransform: "uppercase",
    transition: "color 0.2s ease",
    "&:hover": {
      color: "primary.main",
    },
  },
  phone: {
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    color: "inherit",
    transition: "color 0.2s ease",
    "&:hover": {
      color: "primary.main",
    },
  },
  close: {
    alignSelf: "flex-end",
    cursor: "pointer",
    "&:hover": {
      opacity: 0.7,
    },
  },
};

export default styles;
