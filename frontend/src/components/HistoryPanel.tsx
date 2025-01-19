import { Box, CircularProgress, Paper, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { FC } from 'react';
import fetchUserChats from '../actions/fetchUserChats';
import { useAuth } from '../contexts/AuthProvider';
import ChatListItem from './chats/ChatListItem';
import CreateChatButton from './chats/CreateChatButton';
import _ from 'lodash';

interface HistoryPanelProps {
  selectedChat: string | null;
  setSelectedChat: React.Dispatch<React.SetStateAction<string | null>>;
}

const HistoryPanel: FC<HistoryPanelProps> = ({
  selectedChat,
  setSelectedChat,
}) => {
  const { user, token } = useAuth();
  const { data: chatData, isLoading } = useQuery({
    queryKey: ['userChats', user?.id, token],
    queryFn: async () => {
      if (!user || !token) {
        throw new Error('User or Token is missing');
      }
      return fetchUserChats(user!.id, token);
    },
    enabled: !!user && !!token,
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

  if (
    _.isNil(chatData) ||
    _.isNil(chatData.chats) ||
    chatData.chats.length === 0
  ) {
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

  return (
    <Paper
      id="history-panel"
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <Box
        id="history-panel-top-bar"
        sx={{
          display: 'flex',
          alignItems: 'center',
          minHeight: '48px',
          p: '8px',
          pr: '16px',
          justifyContent: 'space-between',
          backgroundColor: 'transparent',
        }}
      >
        <Typography id="LOGO-TEXT" variant="h6" sx={{ ml: 2 }}>
          CHATTERBOX
        </Typography>
        <CreateChatButton setSelectedChat={setSelectedChat} />
      </Box>

      <div
        style={{
          flexGrow: 1,
          overflowY: 'auto',
        }}
      >
        {chatData.chats.map((chat) => (
          <ChatListItem
            key={chat._id}
            chat={chat}
            setSelectedChat={setSelectedChat}
            isHighlighted={chat._id === selectedChat ? true : false}
          />
        ))}
      </div>
    </Paper>
  );
};

export default HistoryPanel;
