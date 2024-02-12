import { Theme, SxProps } from '@mui/material/styles';
import kindsBg from "../../assets/img/kindsBg.png";
import kindsBgMobile from "../../assets/img/kindsBgMobile.png";
import { theme } from '../../../core/theme';

const styles: Record<string, SxProps<Theme>> = {
  container: {
    p: '50px',
    backgroundColor: 'background.default',
    boxShadow: '0px 4px 15px 5px rgba(0, 0, 0, 0.25)',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '1500px'
  },
  gridContainer: {
    display: 'flex',
    flexDirection: 'column'
  },
  sliderWrapper: {
    display: 'flex',
    alignItems: 'center',
    mr: '50px',
    height: '100%'
  },
  slider: {
    width: '430px',
    marginLeft: '60px',
    marginRight: '60px',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '100px',
    },
  },
  info: {

  },
  infoItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  subtitle: {
    width: '100%',
    maxWidth: '200px',
    mr: '16px'
  },
  text: {
    width: '100%',
    maxWidth: '400px'
  },
  arrow: {
    maxWidth: '100%',
    height: 'auto',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '60px',
    },
  },
  slide: {
    marginTop: 'auto',
    margin: 'auto auto'
  },
  image: {
    minWidth: '400px', 
    minHeight: '600px',
    backgroundPosition: "center",
    backgroundSize: "contan",
    backgroundRepeat: "no-repeat",
  },
  colors: {
    display: 'flex',
  },
  color: {
    width: '50px',
    height: '50px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'scale(1.2)',
    }
  },
  priceBlock: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  clarification: {
    maxWidth: '190px',
    fontSize: '10px',
    lineHeight: '10px',
    fontStyle: 'italic',
  }
};

export default styles;
