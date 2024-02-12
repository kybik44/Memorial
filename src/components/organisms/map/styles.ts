import { Theme, SxProps } from '@mui/material/styles';
import kindsBg from "../../assets/img/kindsBg.png";
import { theme } from '../../../core/theme';

const styles: Record<string, SxProps<Theme>> = {
  container: {
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
      py: '20px',
      position: 'static',
      display: 'flex',
      flexDirection: 'column-reverse',
    },
  },
  titleBox: {
    mb: '50px',
    [theme.breakpoints.down('md')]: {
      mb: '25px',
    },
  },
  title: {
    textAlign: 'center',
    mb: '20px'
  },
  map: {
    textAlign: 'center',
    width: '100%',
    height: '70vh',
    [theme.breakpoints.down('sm')]: {
      height: '200px',
    },
  },
  mapLink: {
    display: 'inline-block',
    mt: '8px'
  },
  info: {
    width: '100%',
    height: '100%',
    maxHeight: '675px',
    position: 'absolute',
    top: '50%',
    transform: 'translate(0, -50%)',
    right: '5vw',
    textAlign: 'center',
    maxWidth: '440px',
    p: '50px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
    zIndex: 1,
    [theme.breakpoints.down('lg')]: {
      maxHeight: '535px',
      p: '32px'
    },
    [theme.breakpoints.down('md')]: {
      maxWidth: '300px',
      maxHeight: '435px',
      p: '24px'
    },
    [theme.breakpoints.down('sm')]: {
      position: 'static',
      borderRadius: '0',
      boxShadow: 'none',
      transform: 'none',
      maxWidth: '100%',
      p: '10px',
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
  },
  infoContainer: {
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-evenly',
    },
  },
  infoBox: {
    [theme.breakpoints.down('sm')]: {
      maxWidth: '165px',
      flexBasis: '50%',
      alignItems: 'flex-start',
      textAlign: 'left',
      '&:nth-of-type(-n + 2)': {
        mb: '35px'
      }
    },
  },
  text: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '16px',
      lineHeight: '16px'
    },
  },
  icon: {
    mt: '22px',
  },
  instagramLink: {
    transition: 'all 0.3s ease',
    '&:hover': {
      filter: 'drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4))',
    }
  }
};

export default styles;