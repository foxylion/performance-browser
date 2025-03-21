import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './components/App';
import { CssBaseline, ThemeProvider } from '@mui/material';
import '@fontsource/roboto/latin.css';
import { theme } from './theme.ts';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
