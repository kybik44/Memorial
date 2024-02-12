import { SxProps, Theme } from '@mui/material/styles';

const styles: Record<string, SxProps<Theme>> = {
  menu: {

  },
  menuLink: {
    width: '100%',
    maxWidth: '414px',
    backgroundColor: '#D3D3D3',
    padding: '22px 28px 22px 92px',
    borderTopRightRadius: '10px',
    borderBottomRightRadius: '10px',
    mb: '4px',

    '&:hover': {
      backgroundColor: '#979797',
    }
  },
  link: {
    width: '100%',
    textTransform: 'uppercase',
  },
};

export default styles;
