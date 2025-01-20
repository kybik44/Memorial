import { SxProps, Theme } from '@mui/material/styles';
import kindsBg from "../../../assets/img/kindsBg.png";
import kindsBgMobile from "../../../assets/img/kindsBgMobile.png";
import { theme } from '../../../core/theme';

const styles: Record<string, SxProps<Theme>> = {
  container: {
    position: "relative",
    width: 1,
    height: 1,
    backgroundImage: `url(${kindsBg})`,
    backgroundPosition: "top",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    [theme.breakpoints.down('md')]: {
      backgroundImage: `url(${kindsBgMobile})`,
    },
  },
  content: {
    textAlign: "center",
    py: 20,
    [theme.breakpoints.down('md')]: {
      py: 14,
    },
    [theme.breakpoints.down('sm')]: {
      pt: 6.5,
      pb: 4,
    },
  },
  title: {
    mb: [2.5, 6, 10],
    [theme.breakpoints.down('sm')]: {
      textAlign: "right",
      letterSpacing: '-0.34px',
    },
  },
  gridContainer: {
    display: "flex",
    alignItems: "stretch",
  },
  card: {
    height: 1,
    maxHeight: "550px",
    maxWidth: "350px",
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'column',
    p: 2.5,
    border: '4px solid #6E8061',
    borderRadius: '10px',
    backgroundColor: '#fff',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      p: 1,
      maxWidth: 1,
      border: '1px solid #6E8061',
      borderRadius: '2px',
    },
  },
  image: {
    maxHeight: '300px',
    m: 'auto 0',
    [theme.breakpoints.down('sm')]: {
      objectFit: 'contain',
      width: '120px',
      height: '120px',
    },
  },
  cardTitle: {
    mb: 1,
  },
  cardInfo: {
    display: 'flex',
    flexDirection: 'column',
    width: 1,
    [theme.breakpoints.down('sm')]: {
      width: '160px',
      alignItems: 'flex-start',
      '& .MuiCardContent-root': {
        textAlign: 'left',
        width: 1,
        maxWidth: '160px',
        px: 0,
      },
      '& .MuiCardActions-root': {
        px: 0,
        width: 1,
      },
    },
  },
  button: {
    width: 1,
  },
};

export default styles;
