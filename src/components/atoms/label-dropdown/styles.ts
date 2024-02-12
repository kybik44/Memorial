import { SxProps, Theme } from '@mui/material/styles';
import { theme } from '../../../core/theme';

const styles: Record<string, SxProps<Theme>> = {
  openDropdown: {
  },
  arrowIcon: {
    ml: 2
  },
  header: {
    display: 'flex',
    cursor: 'pointer'
  },
  showArrowIcon: {
    transform: 'rotate(180deg)'
  },
  label: {
    textTransform: 'uppercase',
    cursor: 'pointer',
    [theme.breakpoints.down('sm')]: {
      fontSize: '20px',
      lineHeight: '20px'
    },
  }

};

export default styles;