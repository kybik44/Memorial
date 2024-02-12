import { SxProps, Theme } from '@mui/material/styles';
import decorBg from "../../../assets/img/decorBg.png";
import { theme } from '../../../core/theme';

const styles: Record<string, SxProps<Theme>> = {

  container: {
    position: "relative",
    width: "100%",
    height: "100%",
    backgroundImage: `url("${decorBg}")`,
    backgroundPosition: "top",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  },
  cloud: {
    mb: '-7px',
    width: "100%",
  },
  content: {
    pt: '100px',
    [theme.breakpoints.down('md')]: {
      pt: '60px',
    },
    [theme.breakpoints.down('sm')]: {
      pt: '20px',
    },
  },
  titleBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    mb: '80px',
    [theme.breakpoints.down('sm')]: {
      mb: '20px',
    },
  },
  title: {
    flexGrow: 1,
    textAlign: 'center',
    px: 2,
    [theme.breakpoints.down('sm')]: {
      px: 0.5,
      maxWidth: '225px'
    },
  },
  carouselContainer: {
    mx: '60px',
    [theme.breakpoints.down('sm')]: {
      mx: '0'
    },
  },
  slider: {
    maxWidth: '1550px',
  },
  card: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'column',
    borderRadius: '10px',
    background: '#FFF',
    height: '300px',
    p: '16px 35px 35px 35px',
    [theme.breakpoints.down('sm')]: {
      p: '16px',
      height: 'auto',
    },
  },
  image: {
    maxHeight: '170px',
    m: 'auto 0',
    [theme.breakpoints.down('sm')]: {
      objectFit: 'contain',
      width: '120px',
      height: '120px',
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
    width: '100%'
  },
  arrowContainer: {
    width: 'auto',
    height: 'auto',
  },
  arrow: {
    maxWidth: '100%',
    height: 'auto',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '60px',
    },
  },
  button: {
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    },
  }
};

export default styles;
