import { SxProps, Theme } from '@mui/material/styles';
import { theme } from '/core/theme';

const styles: Record<string, SxProps<Theme>> = {
  container: {
    py: 1,
  },
  drawer: {
    width: '80vw',
    p: '80px 20px',
  },
  links: {
    justifyContent: 'space-evenly',
  },
  navItem: {
    display: 'flex',
    p: 0,
    mr: 2,
    textTransform: 'uppercase',
    cursor: 'pointer',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '280px',
    },
  },
  linkText: {
    textTransform: "uppercase",
    marginRight: 1,
    [theme.breakpoints.down('md')]: {
      fontSize: '20px',
      lineHeight: '20px',
      maxWidth: '280px',
    },
  },
  phone: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    textDecoration: 'none',
    cursor: 'pointer',
  },
  close: {
    position: 'absolute',
    top: '20px',
    right: '25px'
  }
};

export default styles;
