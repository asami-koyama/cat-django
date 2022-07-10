import { createTheme } from '@mui/material/styles';

export const Header = createTheme({
  palette: {
    primary: {
      main: '#efe5cf',
      contrastText: '#c88f55'
    },
    secondary: {
      main: '#675642',
      contrastText: '#675642',
    },
  },
});

export const Sign = createTheme({
  palette: {
    primary: {
      main: '#efe5cf',
      contrastText: '#675642'
    },
    secondary: {
      main: '#675642',
      contrastText: '#c88f55',
    },
  },
});

export const Detail = createTheme({
  palette: {
    primary: {
      main: '#222222',
      contrastText: '#efe5cf'
    },
    secondary: {
      main: '#666666',
      contrastText: '#c88f55',
    },
  },
});