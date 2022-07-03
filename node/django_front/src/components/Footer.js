import * as React from 'react';
import Box from '@mui/material/Box';
import { Header } from './theme'
import { ThemeProvider } from '@mui/material/styles';

export default function Footer() {
  return (
    <ThemeProvider theme={Header}>
      <Box
        sx={{
          width: 1,
          height: 80,
          backgroundColor: 'primary.main',
          bottom: 0,
          position: 'flex',
          mt:4
        }}
      />
    </ThemeProvider>
  );
}