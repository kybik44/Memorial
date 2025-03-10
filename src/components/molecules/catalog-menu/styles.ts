import { SxProps, Theme } from "@mui/material/styles";
import { theme } from "/core/theme";

const styles: Record<string, SxProps<Theme>> = {
  menuContainer: {
    width: "100%",
    maxWidth: "414px",
    position: "sticky",
    top: "20px",
  },
  menu: {
    width: "100%",
    backgroundColor: "transparent",
  },
  menuLink: {
    width: "100%",
    height: "70px",
    backgroundColor: "#D3D3D3",
    padding: "22px 28px 22px 92px",
    borderTopRightRadius: "10px",
    borderBottomRightRadius: "10px",
    mb: 0.5,
    transition: "all 0.3s ease",
    "&:hover": {
      backgroundColor: "#979797",
    },
    [theme.breakpoints.down("lg")]: {
      height: "50px",
      padding: "12px 16px 12px 40px",
    },
    [theme.breakpoints.down("md")]: {
      height: "40px",
      padding: "12px 16px 12px 40px",
      borderTopRightRadius: "5px",
      borderBottomRightRadius: "5px",
    },
  },
  activeLink: {
    backgroundColor: "#979797",
    "&:hover": {
      backgroundColor: "#878787",
    },
  },
  nestedLink: {
    height: "60px",
    padding: "16px 28px 16px 112px",
    backgroundColor: "#E8E8E8",
    [theme.breakpoints.down("lg")]: {
      height: "45px",
      padding: "12px 16px 12px 60px",
    },
    [theme.breakpoints.down("md")]: {
      height: "35px",
      padding: "8px 16px 8px 50px",
    },
  },
  activeNestedLink: {
    backgroundColor: "#BDBDBD",
    "&:hover": {
      backgroundColor: "#ADADAD",
    },
  },
  nestedList: {
    pl: 2,
    padding: 0,
    margin: 0,
    '& .MuiCollapse-wrapper': {
      minHeight: 0,
    },
    '& .MuiCollapse-wrapperInner': {
      marginTop: 0,
      marginBottom: 0,
    },
  },
  link: {
    width: "100%",
    textTransform: "uppercase",
    mr: 1,
    fontSize: {
      xs: "14px",
      sm: "16px",
      md: "18px",
    },
    lineHeight: 1.2,
  },
};

export const drawerAnimation = {
  entering: {
    transform: "translateX(0%)",
    transition: "transform 0.3s ease-out",
  },
  entered: {
    transform: "translateX(0%)",
  },
  exiting: {
    transform: "translateX(-100%)",
    transition: "transform 0.3s ease-out",
  },
  exited: {
    transform: "translateX(-100%)",
  },
};

export default styles;
