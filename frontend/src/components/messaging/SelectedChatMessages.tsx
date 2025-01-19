import { Grid2, Typography } from '@mui/material';
import { FC, useEffect, useRef, useState } from 'react';
import MessageInput from './MessageInput';
import MessageList from './MessageList';
import { Message } from '../../interfaces/Message';
import { useQuery } from '@tanstack/react-query';
import fetchChatMessages from '../../actions/fetchChatMessages';
import { useAuth } from '../../contexts/AuthProvider';
import _ from 'lodash';

interface MessagingProps {
  selectedChat: string;
}

const SelectedChatMessages: FC<MessagingProps> = ({ selectedChat }) => {
  const [input, setInput] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const { token } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ['chatMessages', selectedChat, token],
    queryFn: async () => {
      if (_.isNil(token)) {
        throw new Error('Token is required but not provided.');
      }
      if (_.isNil(selectedChat)) {
        throw new Error('selectedChat is required but not provided.');
      }
      return fetchChatMessages(selectedChat, token);
    },
  });

  const gridRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Scroll to the bottom whenever messages change
    if (gridRef.current) {
      gridRef.current.scrollTop = gridRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (data) {
      setMessages(data.messages);
    }
  }, [data]);

  if (isLoading) {
    return (
      <Grid2
        container
        justifyContent="center"
        alignItems="center"
        sx={{ height: '100vh' }}
      >
        <Typography variant="h5">Loading messages...</Typography>
      </Grid2>
    );
  }

  return (
    <Grid2
      id="chat-grid"
      container
      spacing={1}
      direction="column"
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        height: '100vh',
        paddingX: 5,
        overflow: 'hidden',
      }}
    >
      <Grid2
        id="chat-messages-grid"
        ref={gridRef}
        sx={{
          width: '100%',
          height: '50%', //set to small amount to cater to small screens
          flexGrow: 1, // dynamically fill the remaining space
          overflowY: 'auto',
        }}
      >
        <MessageList messages={messages} />
      </Grid2>

      <Grid2
        id="chat-input-grid"
        sx={{
          flexShrink: 0,
          paddingY: 2,
        }}
      >
        <MessageInput
          input={input}
          setInput={setInput}
          setMessages={setMessages}
          selectedChat={selectedChat}
        />
      </Grid2>
    </Grid2>
  );
};

export default SelectedChatMessages;
