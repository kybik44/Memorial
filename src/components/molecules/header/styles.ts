import { Theme, SxProps } from '@mui/material/styles';
import { theme } from '../../../core/theme';

const styles: Record<string, SxProps<Theme>> = {
  container: {
    py: 1,
  },
  drawer: {
    width: '80vw',
    p: '80px 20px'
  },
  links: {
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    p: 0,
    mr: '20px',
    textTransform: 'uppercase',
    cursor: 'pointer',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '280px'
    },
  },
  linkText: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '20px',
      lineHeight: '20px',
      maxWidth: '280px'
    },
  },
  phone: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    textDecoration: 'none',
    cursor: 'pointer',
  },
};

export default styles;