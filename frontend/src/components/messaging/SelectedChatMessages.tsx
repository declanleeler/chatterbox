import { Grid2, Typography } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import MessageInput from './MessageInput';
import MessageList from './MessageList';
import { Message } from '../../interfaces/Message';
import { useQuery } from '@tanstack/react-query';
import fetchChatMessages from '../../actions/fetchChatMessages';

interface MessagingProps {
  selectedChat: string;
}

const SelectedChatMessages: FC<MessagingProps> = ({ selectedChat }) => {
  const [input, setInput] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  const { data, isLoading } = useQuery({
    queryKey: ['chatMessages', selectedChat],
    queryFn: async () => {
      return fetchChatMessages(selectedChat!);
    },
  });

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
