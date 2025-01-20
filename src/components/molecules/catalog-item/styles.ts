import { SxProps, Theme } from '@mui/material/styles';
import { theme } from '../../../core/theme';

const styles: Record<string, SxProps<Theme>> = {
  container: {
    p: 5,
    [theme.breakpoints.down('md')]: {
      p: 0,
    },
  },
  content: {
    p: 5,
    backgroundColor: 'background.default',
    boxShadow: '0px 4px 15px 5px rgba(0, 0, 0, 0.25)',
    borderRadius: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '1500px',
    [theme.breakpoints.down('lg')]: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      p: 2,
      width: '100%',
      boxShadow: 'none',
    },
    [theme.breakpoints.down('sm')]: {
      borderRadius: 0,
      
    }
  },
  gridContainer: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: { xs: 2, sm: 2.5 },
  },
  sliderWrapper: {
    display: 'flex',
    alignItems: 'center',
    mr: 2,
    height: 1,
    width: 1,
    maxWidth: '450px',
  },
  imageContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: '30px',
    fontWeight: 'bold',
    [theme.breakpoints.down('sm')]: {
      fontSize: '20px',
      lineHeight: '20px',
    },
  },
  infoItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  subtitle: {
    width: 1,
    maxWidth: '200px',
    mr: 2,
    [theme.breakpoints.down('sm')]: {
      fontWeight: '700',
      fontSize: '10px',
      lineHeight: '10px',
    },
  },
  text: {
    width: 1,
    maxWidth: '400px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '10px',
      lineHeight: '10px',
    },
  },
  arrow: {
    width: 1,
    maxWidth: 1,
    height: 'auto',
  },
  colors: {
    display: 'flex',
    mb: { xs: 2, sm: 5 },
  },
  color: {
    width: '50px',
    height: '50px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'scale(1.2)',
    },
  },
  priceBlock: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      mt: 3,
    },
  },
  price: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '20px',
      lineHeight: '20px',
      fontWeight: '700',
    },
  },
  clarification: {
    maxWidth: '190px',
    fontSize: '10px',
    lineHeight: '10px',
    fontStyle: 'italic',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '64px',
      fontSize: '5px',
      lineHeight: '5px',
    },
  },
  button: {
    maxWidth: '300px',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '124px',
    },
  },
};

export default styles;
