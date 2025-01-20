import { SxProps, Theme } from '@mui/material/styles';
import { theme } from '../../../core/theme';

const styles: Record<string, SxProps<Theme>> = {
  container: {
    backgroundColor: '#323232',
  },
  content: {
    display: 'flex',
    justifyContent: 'space-between',
    py: 12.5,
    [theme.breakpoints.down('md')]: {
      py: 6.25,
    },
    [theme.breakpoints.down('sm')]: {
      p: 5,
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  logoContainer: {
    justifyContent: 'space-between',
    mr: 3,
    width: 1,
    maxWidth: '350px',
    [theme.breakpoints.up('md')]: {
      maxWidth: '250px',
    },
    [theme.breakpoints.down('sm')]: {
      alignItems: 'center',
      maxWidth: 1,
      mr: 0,
      mb: 5,
    },
  },
  logo: {
    maxWidth: '92px',
    height: 'auto',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '170px',
      height: 'auto',
    },
  },
  columns: {
    width: 1,
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
  text: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '16px',
      lineHeight: '16px',
    },
  },
  privacy: {
    fontSize: '10px',
    fontWeight: 500,
    lineHeight: '10px',
    maxWidth: '235px',
  },
  links: {
    maxWidth: '175px',
    mr: 3,
    [theme.breakpoints.down('sm')]: {
      maxWidth: 1,
      mr: 0,
      mb: 9.375,
    },
  },
  infos: {
    maxWidth: '400px',
    mr: 3,
    [theme.breakpoints.down('sm')]: {
      maxWidth: 1,
      mr: 0,
      mb: 8.75,
    },
  },
  infoLink: {
    display: 'flex',
    alignItems: 'center',
  },
  time: {
    maxWidth: '225px',
    [theme.breakpoints.down('sm')]: {
      maxWidth: 1,
    },
  },
  timeItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
};

export default styles;
