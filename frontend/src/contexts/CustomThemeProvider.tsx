import React, {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { createTheme, ThemeProvider, PaletteMode } from '@mui/material';

interface CustomThemeProviderProps {
  children: ReactNode;
}
interface CustomThemeContextProps {
  mode: 'light' | 'dark';
  setMode: React.Dispatch<React.SetStateAction<'light' | 'dark'>>;
}

const CustomThemeContext = createContext<CustomThemeContextProps | null>(null);

export const useCustomThemeContext = () => {
  const context = useContext(CustomThemeContext);
  if (!context) {
    throw new Error(
      'useCustomThemeContext must be used within a CustomThemeProvider',
    );
  }
  return context;
};

const CustomThemeProvider: FC<CustomThemeProviderProps> = ({ children }) => {
  // Check local storage for the saved theme mode or default to light
  const storedMode = localStorage.getItem('themeMode');
  const [mode, setMode] = useState<PaletteMode>(
    storedMode === 'dark' ? 'dark' : 'light',
  );

  // Update local storage whenever the theme mode changes
  useEffect(() => {
    localStorage.setItem('themeMode', mode);
  }, [mode]);

  // Create the theme based on the current mode
  const theme = createTheme({
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
    },
  });

  const value = { mode, setMode };

  return (
    <CustomThemeContext.Provider value={value}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>;
    </CustomThemeContext.Provider>
  );
};

export default CustomThemeProvider;
