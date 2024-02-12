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
    py: '100px',
    [theme.breakpoints.down('md')]: {
      py: '50px',
    },
    [theme.breakpoints.down('sm')]: {
      pt: '10px',
      pb: '30px',
    },
  },
  title: {
    mb: "80px",
    [theme.breakpoints.down('md')]: {
      mb: "40px",
    },
    [theme.breakpoints.down('sm')]: {
      mb: "30px",
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
    p: '25px 15px 35px 15px',
    boxShadow: '0',
    backgroundColor: '#fff',
    [theme.breakpoints.down('sm')]: {
      px: '0',
      py: '10px'
    },
  },
  cardTitle: {
    // mb: 0.5,
    [theme.breakpoints.down('sm')]: {
      p: '5px',
    },
  },
  image: {
    width: '100%',
    objectFit: 'contain',
    maxWidth: '450px',
    maxHeight: '250px'
  },
  actions: {
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      maxWidth: '200px',
      p: 0
    },
  },
  button: {
    width: '100%'
  }
};

export default styles;