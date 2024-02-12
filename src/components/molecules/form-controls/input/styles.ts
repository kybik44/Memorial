import { Theme, SxProps } from '@mui/material/styles';
import { theme } from '../../../../core/theme';

const styles: Record<string, SxProps<Theme>> = {
  formControl: {
    width: '100%'
  },
  label: {
    mb: 2,
    [theme.breakpoints.down('sm')]: {
      mb: 1,
      pl: '10px',
      fontSize: '12px',
      lineHeight: '12px',
      fontWeight: '700'
    },
  },
  input: {
    padding: '5px 22px',
    borderRadius: "10px",
    width: '100%',
    boxShadow: "2px 2px 9px 1px rgba(0, 0, 0, 0.25), 0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
    fontSize: '20px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '12px',
      padding: '0px 22px',
      borderRadius: "5px",
      '& > .MuiInputBase-input': {
        p: '11px 19px'
      }
    }
  }

};

export default styles;


