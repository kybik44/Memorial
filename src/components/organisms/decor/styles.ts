import { SxProps, Theme } from '@mui/material/styles';
import { theme } from '../../../core/theme';
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
    mb: '-7px',
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
    textAlign: 'center',
    px: [0.5, 1, 2],
    [theme.breakpoints.down('sm')]: {
      maxWidth: '225px',
    },
  },
  carouselContainer: {
    mx: [0, 0, 6],
    position: 'relative',
  },
  slider: {
    maxWidth: '1550px',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: '10px',
    background: '#FFF',
    p: [1, 2, 4],
    height: '100%', // Make all cards take the full height
  },
  image: {
    height: '170px',
    width: 1,
    objectFit: 'contain',
    [theme.breakpoints.down('sm')]: {
      height: '130px',
    },
  },
  cardTitle: {
    textAlign: 'center',
    mb: 2,
    [theme.breakpoints.down('sm')]: {
      fontSize: '16px',
    },
  },
  cardFooter: {
    display: "flex",
    flexDirection: "column",
    width: 1,
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  button: {
    alignSelf: 'center',
    [theme.breakpoints.down('sm')]: {
      width: 1,
    },
  },
  arrowContainer: {
    width: 'auto',
    height: 'auto',
  },
  arrow: {
    maxWidth: 1,
    height: 'auto',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '60px',
    },
  },
};

export default styles;
