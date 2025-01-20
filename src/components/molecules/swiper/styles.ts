import { SxProps, Theme } from '@mui/material/styles';
import { theme } from '../../../core/theme';

const styles: Record<string, SxProps<Theme>> = {
  container: {
    position: 'relative',
    width: '100%',
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
    width: '64px',
    height: '64px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2, // Increase z-index to ensure visibility
    cursor: 'pointer',
    transition: 'all 0.3s ease-out',
    left: '0',
    marginLeft: '-50px',
    [theme.breakpoints.down('md')]: {
      marginLeft: '-8px',
    },
    '&:last-of-type': {
      left: 'auto',
      right: '0',
      marginRight: '-50px',
      [theme.breakpoints.down('md')]: {
        marginRight: '-8px',
      },
    },
    '& svg': {
      fill: '#fff',
      width: '40px',
      height: '40px',
      [theme.breakpoints.down('md')]: {
        width: '24px',
        height: '24px',
      },
      '&:hover': {
        fill: '#BCBCBC',
        filter: 'drop-shadow(0 4px 4px rgba(0, 0, 0, 0.4))',
      },
    },
  },
};

export default styles;
