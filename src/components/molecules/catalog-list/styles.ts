import { SxProps, Theme } from '@mui/material/styles';
import { theme } from '../../../core/theme';

const styles: Record<string, SxProps<Theme>> = {
  gridContainer: {
    width: 1,
    display: "flex",
    alignItems: "stretch",
    p: 5,
    [theme.breakpoints.down('md')]: {
      p: 3,
    },
    [theme.breakpoints.up('xl')]: {
      '& .MuiGrid-rowSpacing': {
        margin: '-8px',
      },
    }
  },
  card: {
    height: 1,
    maxHeight: "500px",
    width: 1,
    maxWidth: 1,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'column',
    p: 2.5,
    borderRadius: 2.5,
    backgroundColor: '#fff',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.25)',
    gap: 2,
    [theme.breakpoints.down('sm')]: {
      gap: 1,
      p: 1.5,
      // minHeight: "260px",
    },
  },
  image: {
    maxHeight: '280px',
    m: 'auto 0',
    objectFit: 'contain',
    [theme.breakpoints.down('sm')]: {
      maxHeight: '160px',
    },
  },
  cardTitle: {
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {

    }
  },
  price: {
    fontWeight: '700',
  },
  cardContent: {
    p: 0,
    textAlign: 'center',
  },
  cardInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      width: '160px',
      alignItems: 'center',
      '& .MuiCardContent-root': {
        width: 1,
        maxWidth: '160px',
        px: 0,
      },
      '& .MuiCardActions-root': {
        justifyContent: 'center',
        p: 0,
        width: 1,
      }
    },
  },
  button: {
    maxWidth: '170px',
    mt: 1,
    [theme.breakpoints.down('lg')]: {
      maxWidth: '120x',
      p: '6px 8px',
      fontSize: '12px',
      fontWeight: '600',
    },

    [theme.breakpoints.down('sm')]: {
      maxWidth: '84px',
      p: '0px 8px',
      fontSize: '10px',
      fontWeight: '600',
    },

    '& > a': {
      textDecoration: 'none',
      fontSize: '15px',
      fontWeight: '600',
      color: 'text.secondary',
      [theme.breakpoints.down('sm')]: {
        fontSize: '10px',
        lineHeight: '10px',
      }
    }
  }
};

export default styles;
