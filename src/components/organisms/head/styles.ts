import { Theme, SxProps } from '@mui/material/styles';
import headBg from "../../../assets/img/headBg.png";
import headBgMobile from "../../../assets/img/headBgMobile.png";
import cloud from "../../assets/img/cloud.png";
import { theme } from '../../../core/theme';

const styles: Record<string, SxProps<Theme>> = {
  container: {
    position: "relative",
    height: "112vh",
    backgroundImage: `url("${headBg}")`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    [theme.breakpoints.down('sm')]: {
      height: "90vh",
      backgroundImage: `url("${headBgMobile}")`,
    },
  },
  content: {
    width: "100%",
    height: "100%",
    py: '100px',
    [theme.breakpoints.down('sm')]: {
      py: '20px',
    },
  },
  gridContainer: {
    height: "inherit",
    direction: "column",
    alignItems: "space-between",
    justifyContent: "space-between",
    [theme.breakpoints.down('lg')]: {
      maxHeight: "80vh",
    },
    [theme.breakpoints.down('sm')]: {
      justifyContent: "flex-start",
    },
  },
  title: {
    mt: '40px',
    maxWidth: '890px',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '170px',
    },
  },
  logo: {
    maxWidth: '445px',
    height: 'auto',
    [theme.breakpoints.down('sm')]: {
      margin: '0 auto',
      maxWidth: '170px',
    },
  }
};

export default styles;
