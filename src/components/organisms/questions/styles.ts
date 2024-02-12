import { Theme, SxProps } from '@mui/material/styles';
import questionsBg from "../../../assets/img/questionsBg.png";
import { theme } from '../../../core/theme';

const styles: Record<string, SxProps<Theme>> = {
  container: {
    [theme.breakpoints.down('sm')]: {
      pt: '25px',
      pb: '40px',
    },
  },
  content: {
    py: '100px',
    position: "relative",
    width: "100%",
    height: "100%",
    backgroundImage: `url("${questionsBg}")`,
    backgroundPosition: "top",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    [theme.breakpoints.down('md')]: {
      py: '50px',
    },
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      py: '0',
      backgroundImage: `none`,
    },
  },
  title: {
    maxWidth: "60%",
    mb: '60px',
    [theme.breakpoints.down('md')]: {
      maxWidth: "80%",
    },
    [theme.breakpoints.down('sm')]: {
      textAlign: "center",
      maxWidth: "100%",
      mb: '20px',
    },
  },
  subtitle: {
    display: "inline-block",
    maxWidth: "450px",
    mb: '50px',
    [theme.breakpoints.down('sm')]: {
      textAlign: "center",
      maxWidth: "100%",
      mb: '40px',
    },
  },
  form: {
    width: "100%",
  },
  item: {
    width: '100%',
    maxWidth: "400px",
  },
  gridContainer: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "flex-start",
    [theme.breakpoints.down('md')]: {
      alignItems: "flex-start",
      flexDirection: 'column',
    },
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  image: {
    height: "100%",
    width: "100%",
    maxHeight: "100%"
  },
  button: {
    p: '23px 28px',
    width: "100%",
    [theme.breakpoints.down('sm')]: {
      mt: '20px',
    },
  }
};

export default styles;
