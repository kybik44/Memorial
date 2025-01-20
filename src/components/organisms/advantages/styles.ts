import { SxProps, Theme } from '@mui/material/styles';
import { theme } from '../../../core/theme';

const styles: Record<string, SxProps<Theme>> = {
  container: {
    py: ['100px', '60px', '20px 40px'],
    [theme.breakpoints.down('md')]: {
      py: '60px',
    },
    [theme.breakpoints.down('sm')]: {
      pt: '20px',
      pb: '40px',
    },
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  titleBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 1,
    mb: [5, 6, 10],
    [theme.breakpoints.down('md')]: {
      mb: '40px',
    },
    [theme.breakpoints.down('sm')]: {
      px: 0.5,
    },
  },
  title: {
    textAlign: 'center',
    flexGrow: 1,
    px: ['2rem', '0.5rem'],
    [theme.breakpoints.down('sm')]: {
      px: '0.5rem',
    },
  },
  arrowContainer: {
    width: 'auto',
    height: 'auto',
  },
  arrow: {
    maxWidth: 1,
    height: 'auto',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '60px',
    },
  },
  advantages: {
    justifyContent: 'space-around',
    width: 1,
    maxWidth: '1500px'
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'baseline',
    py: ['1rem', '0.5rem'],
    px: ['2rem', '1rem'],
    [theme.breakpoints.down('sm')]: {
      py: '0.5rem',
      px: '1rem',
    },
  },
  itemTitle: {
    mb: ['15px', '10px'],
    [theme.breakpoints.down('sm')]: {
      mb: '10px',
    },
  },
  textBlock: {
    ml: ['40px', '24px'],
    [theme.breakpoints.down('sm')]: {
      ml: '24px',
    },
  },
  icon: {},
};

export default styles;