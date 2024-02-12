import { Theme, SxProps } from '@mui/material/styles';
import { theme } from '../../../core/theme';

const styles: Record<string, SxProps<Theme>> = {
  container: {},
  content: {
    alignItems: "end",
    flexWrap: 'nowrap',
    p: '100px 0 100px 0',
    [theme.breakpoints.down('md')]: {
      py: '60px',
    },
    [theme.breakpoints.down('sm')]: {
      py: '20px',
      flexDirection: 'column-reverse',
      alignItems: 'flex-start'
    },
  },
  title: {
    mb: 4,
    [theme.breakpoints.down('sm')]: {
      mb: 1.5,
      maxWidth: '200px'
    },
  },
  image: {
    maxWidth: '100%',
    height: 'auto',
    padding: 0,
    margin: 0,
    objectFit: 'cover',
    [theme.breakpoints.down('lg')]: {
      minHeight: "240px",
    },
  },
  text: {
    [theme.breakpoints.down('sm')]: {
      maxWidth: '255px',
    },

  }
};

export default styles;
