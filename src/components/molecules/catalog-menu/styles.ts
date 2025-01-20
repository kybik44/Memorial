import { SxProps, Theme } from '@mui/material/styles';
import { theme } from '/core/theme';

const styles: Record<string, SxProps<Theme>> = {
  menu: {},
  menuLink: {
    width: 1,
    height: '70px',
    maxWidth: '414px',
    backgroundColor: '#D3D3D3',
    padding: '22px 28px 22px 92px',
    borderTopRightRadius: '10px',
    borderBottomRightRadius: '10px',
    mb: 0.5,
    '&:hover': {
      backgroundColor: '#979797',
    },
    [theme.breakpoints.down('lg')]: {
      height: '50px',
      padding: '12px 16px 12px 40px',
    },
    [theme.breakpoints.down('md')]: {
      height: '40px',
      padding: '12px 16px 12px 40px',
      borderTopRightRadius: '5px',
      borderBottomRightRadius: '5px',
    },
  },
  link: {
    width: 1,
    textTransform: 'uppercase',
    mr: 1,
  },
};

export default styles;
