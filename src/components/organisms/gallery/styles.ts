import { SxProps, Theme } from '@mui/material/styles';
import kindsBg from "../../assets/img/kindsBg.png";
import { theme } from '../../../core/theme';

const styles: Record<string, SxProps<Theme>> = {
  container: {
    position: "relative",
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    py: [2, 5, 10],
    [theme.breakpoints.down('md')]: {
      py: 5,
    },
    [theme.breakpoints.down('sm')]: {
      py: 2,
    },
  },
  title: {
    mb: [1.5, 4, 10],
  },
  gridContainer: {
    display: "flex",
    alignItems: "stretch",
  },
  imageList: {
    width: 1,
    height: 1,
    msOverflowStyle: 'none',
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  listItem: {
    cursor: 'pointer',
    transition: 'transform 1s ease',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
  button: {
    maxWidth: '440px',
    mt: [1.5, 3, 5],
  },
  modalBox: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    height: '80%',
    '&:focus-visible': {
      outline: 'none',
    },
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%', // Full height to center vertically
    width: 'auto',
    zIndex: 10,
    cursor: 'pointer',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrow: {
    height: '40px',
    width: '40px',
    fill: '#fff',
    '&:hover': {
      fill: '#BCBCBC',
      filter: 'drop-shadow(3px 5px 2px rgba(0, 0, 0, 0.4))',
    },
  },
  close: {
    width: '34px',
    height: '34px',
    position: 'absolute',
    top: ['1%', '5%', '-5%'], // Responsive top position
    right: ['1%', '5%', '5%'], // Responsive right position
    fill: '#fff',
    cursor: 'pointer',
    '&:hover': {
      fill: '#BCBCBC',
      filter: 'drop-shadow(3px 5px 2px rgba(0, 0, 0, 0.4))',
    },
  },
};

export default styles;