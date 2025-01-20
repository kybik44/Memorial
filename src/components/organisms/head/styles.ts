import { SxProps, Theme } from '@mui/material/styles';
import headBg from "../../../assets/img/headBg.png";
import headBgMobile from "../../../assets/img/headBgMobile.png";
import { theme } from '../../../core/theme';

const styles: Record<string, SxProps<Theme>> = {
  container: {
    position: "relative",
    height: "112vh",
    backgroundImage: `url(${headBg})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    [theme.breakpoints.down('sm')]: {
      height: "90vh",
      backgroundImage: `url(${headBgMobile})`,
    },
  },
  content: {
    width: 1,
    height: 1,
    py: 10,
    [theme.breakpoints.down('sm')]: {
      py: 2,
    },
  },
  gridContainer: {
    height: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    [theme.breakpoints.down('lg')]: {
      maxHeight: "80vh",
    },
    [theme.breakpoints.down('sm')]: {
      justifyContent: "flex-start",
    },
  },
  title: {
    mt: 4,
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
