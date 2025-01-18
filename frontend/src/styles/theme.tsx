// theme.ts
import { createTheme } from '@mui/material/styles';

export const getTheme = (mode: 'light' | 'dark') => {
  return createTheme({
    palette: {
      mode,
    },
    components: {
      MuiIconButton: {
        styleOverrides: {
          root: {
            '&:focus, &:focus-visible': {
              outline: 'none',
            },
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiFilledInput-root': {
              borderRadius: '20px',
              boxShadow: 'none',
              '&.MuiFilledInput-underline:before': {
                borderBottom: 'none',
              },
              paddingTop: '12px',
              paddingBottom: '12px',
            },
            '& .MuiInputLabel-root': {
              top: '-5px',
            },
            '& .MuiInputLabel-shrink': {
              transform: 'translate(12px, -8px) scale(0.75)',
            },
          },
        },
      },
    },
  });
};
