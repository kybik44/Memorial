import { SxProps, Theme } from '@mui/material/styles';
import { theme } from '../../../core/theme';

const styles: Record<string, SxProps<Theme>> = {
  container: {
    py: '100px',
    [theme.breakpoints.down('md')]: {
      py: '60px',
    },
    [theme.breakpoints.down('sm')]: {
      pt: '20px',
      pb: '40px',
    },
  },
  content: {

  },
  titleBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    mb: '80px',
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
    px: 2,
    [theme.breakpoints.down('sm')]: {
      px: 0.5,
    },
  },
  arrowContainer: {
    width: 'auto',
    height: 'auto',
  },
  arrow: {
    maxWidth: '100%',
    height: 'auto',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '60px',
    },
  },
  advantages: {
    justifyContent: 'space-around',
    width: '100%',
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'baseline',
    py: 1,
    px: 2,
    [theme.breakpoints.down('sm')]: {
      py: 0.5,
      px: 1,
    },
  },
  itemTitle: {
    mb: '15px',
    [theme.breakpoints.down('sm')]: {
      mb: '10px'
    },
  },
  textBlock: {
    ml: '40px',
    [theme.breakpoints.down('sm')]: {
      ml: '24px',
    },
  },
  icon: {

  }
};

export default styles;
