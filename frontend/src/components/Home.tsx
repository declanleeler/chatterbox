import { Grid2, useTheme } from '@mui/material';
import { FC } from 'react';
import HistoryPanel from './HistoryPanel';
import TopBar from './Topbar';
import Chat from './chat/Chat';

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
        <Chat />
      </Grid2>
    </Grid2>
  );
};

export default Home;
