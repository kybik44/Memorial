import { Theme, SxProps } from '@mui/material/styles';
import { theme } from '../../../core/theme';

const styles: Record<string, SxProps<Theme>> = {
  container: {},
  content: {
    display: 'flex',
    alignItems: "flex-end",
    flexWrap: 'nowrap',
    padding: '100px 0',
    [theme.breakpoints.down('md')]: {
      paddingY: '60px',
    },
    [theme.breakpoints.down('md')]: {
      paddingY: '20px',
      flexDirection: 'column-reverse',
      alignItems: 'flex-start',
    },
  },
  title: {
    marginBottom: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(1.5),
      maxWidth: '200px',
    },
  },
  image: {
    maxWidth: '100%',
    height: 'auto',
    padding: 0,
    margin: 0,
    objectFit: 'cover',
    [theme.breakpoints.down('sm')]: {
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
