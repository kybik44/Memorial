import { SxProps, Theme } from "@mui/material/styles";
import { theme } from "../../../core/theme";

export const styles: Record<string, SxProps<Theme>> = {
  modal: {
    backdropFilter: "blur(5px)",
    backgroundColor: "rgba(0, 0, 0, 0.85)",
  },
  modalBox: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    height: "90%",
    "&:focus-visible": {
      outline: "none",
    },
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    [theme.breakpoints.down("md")]: {
      width: "100%",
      height: "100%",
    },
  },
  closeButton: {
    position: "absolute",
    top: { xs: 8, sm: 16, md: 24 },
    right: { xs: 8, sm: 16, md: 24 },
    zIndex: 10,
    color: "white",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.6)",
    },
  },
  prevButton: {
    position: "absolute",
    left: { xs: 8, sm: 16, md: 24 },
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 10,
    color: "white",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.6)",
    },
    "&.Mui-disabled": {
      color: "rgba(255, 255, 255, 0.3)",
      backgroundColor: "rgba(0, 0, 0, 0.2)",
    },
  },
  nextButton: {
    position: "absolute",
    right: { xs: 8, sm: 16, md: 24 },
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 10,
    color: "white",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.6)",
    },
    "&.Mui-disabled": {
      color: "rgba(255, 255, 255, 0.3)",
      backgroundColor: "rgba(0, 0, 0, 0.2)",
    },
  },
  navigationIcon: {
    fontSize: { xs: 20, sm: 24, md: 28 },
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: { xs: 2, sm: 4 },
  },
  loader: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 5,
    "& .MuiCircularProgress-root": {
      color: "white",
    },
  },
};
