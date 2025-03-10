import { theme } from "/core/theme";
import { SxProps, Theme } from "@mui/material/styles";

const styles: Record<string, SxProps<Theme>> = {
  wrapper: {
    width: "100%",
    backgroundColor: "primary.dark",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    padding: "16px 0",
    [theme.breakpoints.down("sm")]: {
      padding: "12px 0",
    },
  },
  container: {
    width: "100%",
    maxWidth: "1784px",
    margin: "0 auto",
    padding: "0 24px",
    [theme.breakpoints.down("sm")]: {
      padding: "0 16px",
    },
  },
  link: {
    display: "inline-flex",
    alignItems: "center",
    padding: "4px 8px",
    borderRadius: "4px",
    transition: "all 0.2s ease",
    textDecoration: "none",
    whiteSpace: "nowrap",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.1)",
    },
    [theme.breakpoints.down("sm")]: {
      padding: "2px 4px",
      fontSize: "14px",
    },
  },
  last: {
    fontWeight: 700,
    color: theme.palette.primary.main,
    [theme.breakpoints.down("sm")]: {
      fontSize: "8px",
    },
  },
};

export default styles;
