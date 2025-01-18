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
              borderRadius: '20px', // Rounded corners
              boxShadow: 'none', // No shadow
              '&:hover': {
                borderColor: '#aaa', // Optional hover effect
              },
              '&.Mui-focused': {
                borderColor: '#666', // Optional focus effect
              },
              // Remove the bottom border line
              '&.MuiFilledInput-underline:before': {
                borderBottom: 'none', // Remove the default bottom border
              },
              // Add more vertical padding inside the text field
              paddingTop: '12px', // Adjust padding as needed
              paddingBottom: '12px', // Adjust padding as needed
            },
            '& .MuiInputLabel-root': {
              top: '-5px', // Adjust label position
            },
            '& .MuiInputLabel-shrink': {
              transform: 'translate(12px, -8px) scale(0.75)', // Adjust label shrink position
            },
          },
        },
      },
    },
  });
};
