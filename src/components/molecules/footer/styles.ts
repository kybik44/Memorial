import { Theme, SxProps } from '@mui/material/styles';
import { theme } from '../../../core/theme';

const styles: Record<string, SxProps<Theme>> = {
  container: {
    backgroundColor: '#323232',
  },
  content: {
    display: 'flex',
    justifyContent: 'space-between',
    py: "100px",
    [theme.breakpoints.down('md')]: {
      py: '50px',
    },
    [theme.breakpoints.down('sm')]: {
      p: '40px 40px 20px 40px',
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  logoContainer: {
    justifyContent: 'space-between',
    mr: 3,
    width: '100%',
    maxWidth: '350px',
    [theme.breakpoints.up('md')]: {
      maxWidth: '250px',
    },
    [theme.breakpoints.down('sm')]: {
      alignItems: 'center',
      maxWidth: '100%x',
      mr: 0,
      mb: '40px'
    }
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
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }
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
    maxWidth: '235px'
  },
  links: {
    maxWidth: '175px',
    mr: 3,
    [theme.breakpoints.down('sm')]: {
      maxWidth: '100%',
      mr: 0,
      mb: '75px'
    },
  },
  infos: {
    maxWidth: '400px',
    mr: 3,
    [theme.breakpoints.down('sm')]: {
      maxWidth: '100%',
      mr: 0,
      mb: '70px'
    },
  },
  infoLink: {
    display: 'flex',
    alignItems: 'center',
  },
  time: {
    maxWidth: '225px',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '100%'
    },
  },
  timeItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  }
};

export default styles;