import { Theme, SxProps } from '@mui/material/styles';
import { theme } from '../../../core/theme';
import decorBg from "../../assets/img/decorBg.png";
import decorBgMobile from "../../assets/img/decorBgMobile.png";

const styles: Record<string, SxProps<Theme>> = {
  carouselContainer: {
    position: 'relative',
  },
  slider: {
    // maxWidth: '1550px'
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
    zIndex: 1,
    cursor: 'pointer',
    transition: 'all 0.3s ease-out',
    left: '-6%',
    [theme.breakpoints.down('md')]: {
      left: '-10%',
    },
    [theme.breakpoints.down('sm')]: {
      left: '0',
    },
    '&:last-of-type': {
      left: 'auto',
      right: '-6%',
      [theme.breakpoints.down('md')]: {
        right: '-10%',
      },
      [theme.breakpoints.down('sm')]: {
        right: '0',
      },

    },
    '& svg': {
      fill: '#fff',
      width: '40px',
      height: '40px',
      '&:hover': {
        fill: '#BCBCBC',
        filter: 'drop-shadow(0px 4px 4px rgb(0 0 0 / 0.4))',
      }

    }
  },
};

export default styles;
