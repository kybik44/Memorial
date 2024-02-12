import { SxProps, Theme } from '@mui/material/styles';
import { theme } from '../../../core/theme';

const styles: Record<string, SxProps<Theme>> = {
  'MuiBreadcrumbs-root': {
    // px: '24px',
    // [theme.breakpoints.down('sm')]: {
    //   px: '16px',
    // },
  },
  container: {
    width: '100%',
    py: '18px',
    backgroundColor: 'primary.dark',
    '& .MuiBreadcrumbs-ol': {
      maxWidth: '1784px',
      margin: '0 auto',
    },

  },
  content: {

  }
};

export default styles;
