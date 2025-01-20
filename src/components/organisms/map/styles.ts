import { SxProps, Theme } from '@mui/material/styles';
import { theme } from '../../../core/theme';

const styles: Record<string, SxProps<Theme>> = {
  container: {
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
      py: 2,
      position: 'static',
      display: 'flex',
      flexDirection: 'column-reverse',
    },
  },
  titleBox: {
    mb: [2.5, 5],
    [theme.breakpoints.down('md')]: {

    },
  },
  title: {
    textAlign: 'center',
    mb: 2,
  },
  map: {
    textAlign: 'center',
    width: 1,
    height: '70vh',
    [theme.breakpoints.down('sm')]: {
      height: '200px',
    },
  },
  mapLink: {
    display: 'inline-block',
    textDecoration: 'underline',
    mt: 1,
  },
  info: {
    width: 1,
    height: 1,
    maxHeight: '675px',
    position: 'absolute',
    top: '50%',
    transform: 'translate(0, -50%)',
    right: '5vw',
    textAlign: 'center',
    maxWidth: '440px',
    p: 5,
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
    zIndex: 1,
    [theme.breakpoints.down('lg')]: {
      maxHeight: '535px',
      p: 4,
    },
    [theme.breakpoints.down('md')]: {
      maxWidth: '300px',
      maxHeight: '435px',
      p: 3,
    },
    [theme.breakpoints.down('sm')]: {
      position: 'static',
      borderRadius: 0,
      boxShadow: 'none',
      transform: 'none',
      maxWidth: 1,
      p: 1,
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
        mb: 3.5,
      },
    },
  },
  link: {
    textDecoration: 'none'
  },
  text: {

    [theme.breakpoints.down('sm')]: {
      fontSize: '16px',
      lineHeight: '16px',
    },
  },
  show: {
    textDecoration: 'underline',
  },
  icon: {
    mt: 2.2,
  },
  instagramLink: {
    transition: 'all 0.3s ease',
    '&:hover': {
      filter: 'drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4))',
    },
  },
};

export default styles;
