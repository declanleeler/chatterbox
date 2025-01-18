import { CircularProgress, Paper, Typography } from '@mui/material';
import { FC } from 'react';
import ChatListItem from './chats/ChatListItem';
import CreateChatButton from './chats/CreateChatButton';
import { useQuery } from '@tanstack/react-query';
import fetchUserChats from '../actions/fetchUserChats';
import { useAuth } from '../contexts/AuthProvider';

interface HistoryPanelProps {
  selectedChat: string | null;
  setSelectedChat: React.Dispatch<React.SetStateAction<string | null>>;
}

const HistoryPanel: FC<HistoryPanelProps> = ({
  selectedChat,
  setSelectedChat,
}) => {
  const { user } = useAuth();
  const { data: chatData, isLoading } = useQuery({
    queryKey: ['userChats'],
    queryFn: async () => {
      return fetchUserChats(user!.id);
    },
  });

  if (isLoading) {
    return (
      <Paper
        sx={{
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress />
      </Paper>
    );
  }

  if (!chatData || chatData.chats.length === 0) {
    return (
      <Paper
        sx={{
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography>No chats available</Typography>
      </Paper>
    );
  }

  console.log(selectedChat);

  return (
    <Paper sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* CreateChatButton stays fixed at the top */}
      <CreateChatButton />

      {/* Scrollable area for the chat list */}
      <div
        style={{
          flexGrow: 1,
          overflowY: 'auto', // Enable vertical scrolling
          overflowX: 'hidden', // Disable horizontal scrolling
        }}
      >
        <Paper>selected chat: {selectedChat}</Paper>
        {chatData.chats.map((chat) => (
          <ChatListItem
            key={chat._id}
            chat={chat}
            setSelectedChat={setSelectedChat}
          />
        ))}
      </div>
    </Paper>
  );
};

export default HistoryPanel;
