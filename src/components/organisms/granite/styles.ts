import { Theme, SxProps, keyframes } from '@mui/material/styles';
import smog from "../../../assets/img/smog.png";
import { theme } from '../../../core/theme';

const styles: Record<string, SxProps<Theme>> = {
  container: {
    position: 'relative',
    textAlign: 'center',
  },
  content: {
    py: '100px',
    [theme.breakpoints.down('md')]: {
      py: '60px',
    },
    [theme.breakpoints.down('sm')]: {
      py: '20px',
    },
  },
  title: {
    mb: 9,
    [theme.breakpoints.down('sm')]: {
      mb: 2,
    },
  },
  cards: {
  },
  cardContainer: {
    maxWidth: '300px',
    maxHeight: '300px',
  },
  cardText: {
    textAlign: 'center',
    mt: '7px',
    [theme.breakpoints.down('sm')]: {
      mt: '3px'
    },
  },
  smog: {
    position: "absolute",
    bottom: "0",
    width: "100%",
    height: "50%",
    backgroundImage: `url("${smog}")`,
    backgroundPosition: "bottom",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    zIndex: "1",
    opacity: "0",
    transition: 'opacity 1s ease',
    [theme.breakpoints.down('sm')]: {
      height: "35%",
    },
  },
  button: {
    zIndex: '2',
    mt: '0',
    transition: 'all 2s ease',
    width: '100%',
    maxWidth: '280px',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '100%',
    },
  },
  collapse: {
    "& .MuiCollapse-wrapperInner": {
      marginBottom: "100px",
      [theme.breakpoints.down('sm')]: {
        marginBottom: "30px",
      },
    }
  }
};

export default styles;
