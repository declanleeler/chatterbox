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
      <Grid2
        id="left-panel"
        size={3}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '100vh',
          flexBasis: 0,
          flexGrow: 1,
          border: 'solid 1px red',
          '&:hover ::-webkit-scrollbar-thumb': {
            backgroundColor: 'grey',
          },
          '& ::-webkit-scrollbar-thumb': {
            backgroundColor: 'transparent',
            transition: 'background-color 0.3s ease',
          },
        }}
      >
        <HistoryPanel
          setSelectedChat={setSelectedChat}
          selectedChat={selectedChat}
        />
      </Grid2>
      <Grid2
        id="right-panel"
        size={9}
        flexDirection={'column'}
        sx={{
          display: 'flex',
          maxHeight: '100vh',
          '&:hover ::-webkit-scrollbar-thumb': {
            backgroundColor: 'grey',
          },
          '& ::-webkit-scrollbar-thumb': {
            backgroundColor: 'transparent',
            transition: 'background-color 0.3s ease',
          },
        }}
      >
        <TopBar />
        <Messaging selectedChat={selectedChat} />
      </Grid2>
    </Grid2>
  );
};

export default Home;
