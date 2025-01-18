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
      id="chat"
      container
      spacing={2}
      direction="column"
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        height: '100%',
        paddingX: 5,
        border: 'solid red',
      }}
    >
      <Grid2
        id="convo"
        sx={{
          width: '100%',
          maxHeight: '50%',
          overflowY: 'auto',
          overflowX: 'hidden',
          border: 'solid green',
        }}
      >
        <MessageList messages={messages} />
      </Grid2>

      <Grid2
        id="input-convo"
        sx={{
          marginTop: 1,
          minWidth: '100%',
          paddingBottom: 5,
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
