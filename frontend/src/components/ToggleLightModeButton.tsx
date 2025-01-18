import { ModeNightRounded, WbSunnyRounded } from '@mui/icons-material';
import { useCustomThemeContext } from '../contexts/CustomThemeProvider';
import { IconButton } from '@mui/material';

const ToggleLightModeButton = () => {
  const { mode, setMode } = useCustomThemeContext();

  return (
    <IconButton
      size="large"
      color="inherit"
      onClick={() => {
        setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
      }}
    >
      {mode === 'light' ? <WbSunnyRounded /> : <ModeNightRounded />}
    </IconButton>
  );
};

export default ToggleLightModeButton;
