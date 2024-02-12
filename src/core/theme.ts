import { Theme, createTheme, responsiveFontSizes } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface DefaultTheme extends Theme { }
}

export const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1440,
      xl: 1784,
    },
  },
  palette: {
    primary: {
      main: "#000000",
      dark: '#6E8061'
    },
    text: {
      primary: '#313131',
      secondary: "#FFFFFF"
    },
    background: {
      paper: '#F9F9F9',
      default: '#FFFFFF',
    },
  },
  typography: {
    h1: {
      fontFamily: "GarciaMarquez",
      fontSize: "80px",
      fontWeight: 400,
      lineHeight: "80px",
      letterSpacing: "-0.017em",
    },
    h2: {
      fontFamily: "GarciaMarquez",
      fontSize: "60px",
      fontWeight: 400,
      lineHeight: "60px",
      letterSpacing: "-0.017em",
    },
    h3: {
      fontFamily: "GarciaMarquez",
      fontSize: "40px",
      fontWeight: 400,
      lineHeight: "40px",
    },
    h4: {
      fontFamily: "Montserrat",
      fontSize: "20px",
      fontWeight: 600,
      lineHeight: "20px",
    },
    h5: {
      fontFamily: "Montserrat",
      fontSize: "20px",
      fontWeight: 500,
      lineHeight: "20px",
    },
    h6: {
      fontFamily: "Montserrat",
      fontSize: "25px",
      fontWeight: 500,
      lineHeight: "25px",
    },
    subtitle1: {
      fontFamily: "GarciaMarquez",
      fontSize: '50px',
      fontWeight: 400,
      lineHeight: '50px',
    },
    subtitle2: {
      fontFamily: "Montserrat",
      fontSize: "25px",
      fontWeight: 600,
      lineHeight: "25px",
    },
    body1: {
      fontFamily: "Montserrat",
      fontSize: "15px",
      fontWeight: 500,
      lineHeight: "15px",
    },
    body2: {
      fontFamily: "Montserrat",
      fontSize: "25px",
      fontWeight: 400,
      lineHeight: "25px",
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          width: '100%',
          padding: '16px 28px',
          borderRadius: '10px',
          fontFamily: "Montserrat",
          fontSize: "20px",
          fontWeight: 600,
          lineHeight: "25px",
          textTransform: 'none',
          backgroundColor: '#6E8061',
          color: '#FFFFFF',
          borderColor: '#6E8061',
          boxShadow: '4px 6px 8.4px rgba(0, 0, 0, 0.31)',
          '&:hover': {
            boxShadow: "2px 2px 18px 5px #56634E, 0px 0px 4px 0px #56634E",
            backgroundColor: '#56634E',
          },
          '@media (max-width: 960px)': {
            padding: '5px 12px',
            borderRadius: '5px',
            fontSize: '10px'
          }
        },
        outlined: {
          color: '#6E8061',
          backgroundColor: 'transparent',
        },
        contained: {
          boxShadow: 'none',
        },
      },
    },
  }
});