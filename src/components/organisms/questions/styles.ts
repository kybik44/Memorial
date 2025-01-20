import { SxProps, Theme } from '@mui/material/styles';
import questionsBg from "../../../assets/img/questionsBg.png";
import { theme } from '../../../core/theme';

const styles: Record<string, SxProps<Theme>> = {
  container: {
    [theme.breakpoints.down('sm')]: {
      pt: 2.5,
      pb: 4,
    },
  },
  content: {
    py: 10,
    position: "relative",
    width: 1,
    height: 1,
    backgroundImage: `url("${questionsBg}")`,
    backgroundPosition: "top",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    [theme.breakpoints.down('md')]: {
      py: 5,
    },
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      py: 0,
      backgroundImage: `none`,
    },
  },
  title: {
    maxWidth: "60%",
    mb: [2.5, 6, 10],
    [theme.breakpoints.down('md')]: {
      maxWidth: "80%",
    },
    [theme.breakpoints.down('sm')]: {
      textAlign: "center",
      maxWidth: 1,
    },
  },
  subtitle: {
    display: "inline-block",
    maxWidth: "450px",
    mb: 5,
    [theme.breakpoints.down('sm')]: {
      textAlign: "center",
      maxWidth: 1,
      mb: 4,
    },
  },
  form: {
    width: 1,
  },
  item: {
    width: 1,
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
    height: 1,
    width: 1,
    maxHeight: 1,
  },
  button: {
    p: 3,
    width: 1,
    [theme.breakpoints.down('sm')]: {
      mt: 2,
    },
  },
};

export default styles;
