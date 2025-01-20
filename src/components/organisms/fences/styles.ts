import { Theme, SxProps } from '@mui/material/styles';
import cloudFencies from "../../assets/img/cloudFencies.png";
import { theme } from '../../../core/theme';

const styles: Record<string, SxProps<Theme>> = {
  container: {
    position: "relative",
  },
  content: {
    display: 'flex',
    textAlign: 'center',
    flexDirection: 'column',
    py: [10, 12, 12],
    [theme.breakpoints.down('md')]: {
      py: 50,
    },
    [theme.breakpoints.down('sm')]: {
      pt: 10,
      pb: 30,
    },
  },
  title: {
    mb: [2.5, 4, 8],
    [theme.breakpoints.down('md')]: {
      mb: 4,
    },
    [theme.breakpoints.down('sm')]: {
      mb: 3,
    },
  },
  gridContainer: {
    display: "flex",
    alignItems: "stretch",
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  card: {
    height: "100%",
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'column',
    p: [2, 4],
    boxShadow: 'none',
    backgroundColor: '#fff',
    [theme.breakpoints.down('sm')]: {
      px: 0,
      py: 1,
    },
  },
  cardTitle: {
    [theme.breakpoints.down('sm')]: {
      p: 1,
    },
  },
  image: {
    width: 1,
    objectFit: 'contain',
    maxWidth: '450px',
    maxHeight: '250px',
  },
  actions: {
    [theme.breakpoints.down('sm')]: {
      width: 1,
      maxWidth: '200px',
      p: 0,
    },
  },
  button: {
    width: 1,
  },
};

export default styles;
