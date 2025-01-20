import { theme } from '/core/theme';
import { SxProps, Theme } from '@mui/material/styles';

const styles: Record<string, SxProps<Theme>> = {
  container: {
    width: 1,
    py: 2,
    backgroundColor: 'primary.dark',
    [theme.breakpoints.down('sm')]: {
      py: 1,
    },
    '& .MuiBreadcrumbs-ol': {
      maxWidth: '1784px',
      margin: '0 auto',
    },
  },
  content: {
    display: 'flex',
    alignItems: 'center',
  },
  link: {
    mx: 0.5,
    [theme.breakpoints.down('sm')]: {
      wordSpacing: 2,
      fontSize: 10,
      lineHeight: '10px',

    },
  },
  last: {
    fontWeight: '700',
    fontStyle: 'italic',
  },
};

export default styles;
