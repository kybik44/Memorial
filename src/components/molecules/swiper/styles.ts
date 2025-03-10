import { SxProps, Theme } from '@mui/material/styles';
import { theme } from '../../../core/theme';

const styles: Record<string, SxProps<Theme>> = {
  container: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  carouselContainer: {
    position: 'relative',
    overflow: 'hidden',
    width: '100%',
    height: '100%',
  },
  slideContainer: {
    display: 'flex',
    transition: 'transform 0.5s ease',
    width: '100%',
    height: '100%',
  },
  slide: {
    flex: '0 0 auto',
    width: '100%',
    height: '100%',
  },
  sliderArrow: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
    cursor: 'pointer',
    transition: 'all 0.3s ease-out',
    // backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: '50%',
    left: '0',
    marginLeft: '-20px',
    [theme.breakpoints.down('md')]: {
      width: '30px',
      height: '30px',
      marginLeft: '-15px',
    },
    '&:last-of-type': {
      left: 'auto',
      right: '0',
      marginRight: '-20px',
      [theme.breakpoints.down('md')]: {
        marginRight: '-15px',
      },
    },
    '& svg': {
      fill: '#fff',
      width: '24px',
      height: '24px',
      [theme.breakpoints.down('md')]: {
        width: '20px',
        height: '20px',
      },
    },
    '&:hover': {
      // backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
  },
};

export default styles;
