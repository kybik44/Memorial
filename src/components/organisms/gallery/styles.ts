import { Theme, SxProps } from '@mui/material/styles';
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
    py: '100px',
    [theme.breakpoints.down('md')]: {
      py: "50px",
    },
    [theme.breakpoints.down('sm')]: {
      py: "20px",
    },
  },
  title: {
    mb: "100px",
    [theme.breakpoints.down('md')]: {
      mb: "40px",
    },
    [theme.breakpoints.down('sm')]: {
      mb: "15px",
    },
  },
  gridContainer: {
    display: "flex",
    alignItems: "stretch",
  },
  imageList: {
    width: '100%',
    height: '100%',
    'msOverflowStyle': 'none',  /* IE and Edge */
    'scrollbarWidth': 'none',  /* Firefox */
    '&::-webkit-scrollbar': { /* Chrome */
      display: 'none',
    },
  },
  listItem: {
    cursor: 'pointer',
    transition: 'all 1s ease',
    '&:hover': {
      transform: 'scale(1.05)'
    }
  },
  button: {
    maxWidth: '440px',
    mt: '50px'
  },
  backdrop: {
    zIndex: (theme) => theme.zIndex.drawer + 1
  },
  modalBox: {
    position: 'relative',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    '&:focus-visible': {
      outline: 'none',
    }
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
    width: '100%',
    height: '100%',
    zIndex: 10,
    cursor: 'pointer',
  },
  arrow: {
    height: '40px',
    width: '40px',
    fill: '#fff',
    '&:hover': {
      fill: '#BCBCBC',
      filter: 'drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4))',
    }
  },
  close: {
    width: '34px',
    height: '34px',
    position: 'absolute',
    top: '-5%',
    right: '5%',
    fill: '#fff',
    cursor: 'pointer',
    '&:hover': {
      fill: '#BCBCBC',
      filter: 'drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4))',
    },
    [theme.breakpoints.down('sm')]: {
      top: '-18%',
      right: '1%',
    },
  }

};

export default styles;