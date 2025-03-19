import { SxProps, Theme } from "@mui/material/styles";
import { theme } from "../../../core/theme";

const styles: Record<string, SxProps<Theme>> = {
  container: {
    p: 5,
    [theme.breakpoints.down("md")]: {
      p: 0,
    },
  },
  content: {
    p: 5,
    backgroundColor: "background.default",
    boxShadow: "0px 4px 15px 5px rgba(0, 0, 0, 0.25)",
    borderRadius: 2,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    maxWidth: "1500px",
    [theme.breakpoints.down("lg")]: {
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
      p: 2,
      width: "100%",
      boxShadow: "none",
    },
    [theme.breakpoints.down("sm")]: {
      borderRadius: 0,
    },
  },
  gridContainer: {
    display: "flex",
    flexDirection: "column",
    rowGap: { xs: 2, sm: 2.5 },
  },
  sliderWrapper: {
    width: "100%",
    maxWidth: "600px",
    margin: "0 auto",
    position: "relative",
    overflow: "hidden",
    // height: '400px',
    padding: "0 60px",
    [theme.breakpoints.down("md")]: {
      padding: "0 30px",
    },
  },
  imageContainer: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },
  title: {
    fontSize: "30px",
    fontWeight: "bold",
    [theme.breakpoints.down("sm")]: {
      fontSize: "20px",
      lineHeight: "20px",
    },
  },
  infoItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: "100%",
    gap: { xs: 1, sm: 2 },
  },
  subtitle: {
    width: "300px",
    fontWeight: 700,
    [theme.breakpoints.down("sm")]: {
      fontSize: "12px",
      lineHeight: "14px",
    },
  },
  text: {
    width: 1,
    maxWidth: "400px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "10px",
      lineHeight: "10px",
    },
  },
  arrow: {
    width: 1,
    maxWidth: 1,
    height: "auto",
  },
  colors: {
    display: "flex",
    mb: { xs: 2, sm: 5 },
  },
  color: {
    width: "50px",
    height: "50px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    "&:hover": {
      transform: "scale(1.2)",
    },
  },
  img_left: {
    clipPath: "polygon(0% 0%, 100% 0%, 0% 100%, 0% 100%)",
  },
  img_right: {
    clipPath: "polygon(100% 0, 100% 0%, 100% 100%, 0% 100%)",
    position: "absolute",
  },
  priceBlock: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    [theme.breakpoints.down("sm")]: {
      mt: 3,
    },
  },
  price: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "20px",
      lineHeight: "20px",
      fontWeight: "700",
    },
  },
  clarification: {
    maxWidth: "190px",
    fontSize: "10px",
    lineHeight: "10px",
    fontStyle: "italic",
    [theme.breakpoints.down("sm")]: {
      maxWidth: "64px",
      fontSize: "5px",
      lineHeight: "5px",
    },
  },
  button: {
    maxWidth: "300px",
    [theme.breakpoints.down("sm")]: {
      maxWidth: "124px",
    },
  },
  slid: {
    width: "100%",
    height: "100%",
    position: "relative",
    "& .MuiBox-root": {
      height: "100%",
    },
  },
};

export default styles;
