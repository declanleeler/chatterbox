import { Grid2, useTheme } from '@mui/material';
import { FC } from 'react';
import HistoryPanel from './HistoryPanel';
import TopBar from './Topbar';
import Messaging from './messaging/Messaging';

const Home: FC = () => {
  const theme = useTheme();

  return (
    <Grid2
      id="home"
      container
      flexDirection={'row'}
      sx={{
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Grid2 id="left-panel" size={3}>
        <HistoryPanel />
      </Grid2>
      <Grid2
        id="right-panel"
        size={9}
        flexDirection={'column'}
        sx={{ display: 'flex' }}
      >
        <TopBar />
        <Messaging />
      </Grid2>
    </Grid2>
  );
};

export default Home;
