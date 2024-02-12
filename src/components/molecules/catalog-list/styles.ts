import { Theme, SxProps } from '@mui/material/styles';
import kindsBg from "../../assets/img/kindsBg.png";
import kindsBgMobile from "../../assets/img/kindsBgMobile.png";
import { theme } from '../../../core/theme';

const styles: Record<string, SxProps<Theme>> = {
  gridContainer: {
    display: "flex",
    alignItems: "stretch",
    p: '50px'
  },
  card: {
    height: "100%",
    maxHeight: "500px",
    maxWidth: "350px",
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'column',
    p: '20px 15px',
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
    maxHeight: '280px',
    m: 'auto 0',
    [theme.breakpoints.down('sm')]: {
      objectFit: 'contain',
      width: '120px',
      height: '120px',
    },
  },
  cardTitle: {
    my: '16px',
  },
  cardContent: {
    p: 0,
    textAlign: 'center',
  },
  cardInfo: {
    display: 'flex',
    flexDirection: 'column',
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