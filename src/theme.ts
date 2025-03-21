import { createTheme, alpha } from '@mui/material';

export const theme = createTheme({
  palette: {
    primary: { main: '#28a5d4' },
    secondary: { main: '#763a24' },
    background: { default: alpha('#28a5d4', 0.1) },
  },
});
