import { SxProps, Theme } from "@mui/material/styles";
import { theme } from "../../../core/theme";
import decorBg from "../../../assets/img/decorBg.png";

const styles: Record<string, SxProps<Theme>> = {
  container: {
    position: "relative",
    width: 1,
    height: 1,
    backgroundImage: `url(${decorBg})`,
    backgroundPosition: "top",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  },
  cloud: {
    mb: "-7px",
    width: 1,
  },
  content: {
    pt: [2.5, 6, 10],
  },
  titleBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 1,
    mb: [2, 2, 10],
  },
  title: {
    flexGrow: 1,
    textAlign: "center",
    px: [0.5, 1, 2],
    [theme.breakpoints.down("sm")]: {
      maxWidth: "225px",
    },
  },
  carouselContainer: {
    width: "100%",
    mt: [2, 4, 6],
  },
  slider: {
    maxWidth: "1550px",
  },
  card: {
    height: "100%",
    width: "100%",
    alignItems: "stretch",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: "10px",
    background: "#FFF",
    p: [1, 2, 4],
  },
  imageContainer: {
    width: "100%",
    height: "200px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      height: "130px",
    },
  },
  imageWrapper: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    borderRadius: "10px",
    backgroundColor: "transparent",
  },
  cardTitle: {
    fontWeight: 600,
    textAlign: "center",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    mb: 2,
    [theme.breakpoints.down("sm")]: {
      fontSize: "16px",
    },
  },
  cardFooter: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    padding: 2,
    height: "100px",
    justifyContent: "space-between",
  },
  button: {
    width: "100%",
    alignSelf: "center",
    [theme.breakpoints.down("sm")]: {
      width: 1,
    },
  },
  arrowContainer: {
    width: "auto",
    height: "auto",
  },
  arrow: {
    maxWidth: 1,
    height: "auto",
    [theme.breakpoints.down("sm")]: {
      maxWidth: "60px",
    },
  },
};

export default styles;
