import { Theme, SxProps } from '@mui/material/styles';
import kindsBg from "../../../assets/img/kindsBg.png";
import kindsBgMobile from "../../../assets/img/kindsBgMobile.png";
import { theme } from '../../../core/theme';

const styles: Record<string, SxProps<Theme>> = {
  container: {
    position: "relative",
    width: "100%",
    height: "100%",
    backgroundImage: `url("${kindsBg}")`,
    backgroundPosition: "top",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    [theme.breakpoints.down('md')]: {
      backgroundImage: `url("${kindsBgMobile}")`,
      // backgroundSize: "contain",
    },
  },
  content: {
    textAlign: "center",
    py: '200px',
    [theme.breakpoints.down('md')]: {
      py: '140px',
    },
    [theme.breakpoints.down('sm')]: {
      pt: '65px',
      pb: '40px',
    },
  },
  title: {
    mb: "80px",
    [theme.breakpoints.down('sm')]: {
      mb: "20px",
      textAlign: "right",
      letterSpacing: '-0.34px'
    },
  },
  gridContainer: {
    display: "flex",
    alignItems: "stretch",
  },
  card: {
    height: "100%",
    maxHeight: "550px",
    maxWidth: "350px",
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'column',
    p: '25px 15px 35px 15px',
    border: '4px solid #6E8061',
    borderRadius: '10px',
    backgroundColor: '#fff',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      p: '5px 20px',
      maxWidth: "100%",
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
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      width: '160px',
      alignItems: 'flex-start',
      '& .MuiCardContent-root': {
        textAlign: 'left',
        width: '100%',
        maxWidth: '160px',
        px: 0,
      },
      '& .MuiCardActions-root': {
        px: 0,
        width: '100%',
      }
    },
  },
  button: {
    width: '100%'
  }
};

export default styles;