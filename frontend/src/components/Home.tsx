import { FC } from 'react';
import { Grid2 } from '@mui/material';
import TopBar from './Topbar';
import ChatHistory from './Navbar';
import Chat from './Chat';

const Home: FC = () => {
  return (
    <Grid2
      container
      sx={{ minWidth: '100vw', minHeight: '100vh' }}
      alignItems="flex-start"
    >
      <Grid2 size={3}>
        <ChatHistory />
      </Grid2>
      <Grid2 size={9} justifyContent="flex-end">
        <TopBar />
        <Chat />
      </Grid2>
    </Grid2>
  );
};

export default Home;
