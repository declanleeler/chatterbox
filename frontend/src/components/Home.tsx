import { Grid2, useTheme } from '@mui/material';
import { FC, useState } from 'react';
import HistoryPanel from './HistoryPanel';
import TopBar from './Topbar';
import Messaging from './messaging/Messaging';

const Home: FC = () => {
  const theme = useTheme();
  const [selectedChat, setSelectedChat] = useState<string | null>(null);

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
        <HistoryPanel setSelectedChat={setSelectedChat} />
      </Grid2>
      <Grid2
        id="right-panel"
        size={9}
        flexDirection={'column'}
        sx={{ display: 'flex' }}
      >
        <TopBar />
        <Messaging selectedChat={selectedChat} />
      </Grid2>
    </Grid2>
  );
};

export default Home;
