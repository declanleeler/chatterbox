import { Grid2 } from '@mui/material';
import { FC, useState } from 'react';
import ChatInput from './ChatInput';
import MessageList from './MessageList';
import { Message } from '../../interfaces/Message';

const Chat: FC = () => {
  const [input, setInput] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      conversationId: '1',
      senderId: 123,
      messageText: 'text1',
      createdOn: 1234,
    },
    {
      conversationId: '1',
      senderId: 123,
      messageText: 'text2 text2 text2 text2 text2 text2 text2 ',
      createdOn: 1235,
    },
    {
      conversationId: '1',
      senderId: 123,
      messageText: 'text3 text3 text3 text3 ',
      createdOn: 1236,
    },
    {
      conversationId: '1',
      senderId: 123,
      messageText: ' text4 text4 text4',
      createdOn: 1237,
    },
  ]);

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
      }}
    >
      <Grid2
        id="convo"
        sx={{
          width: '100%',
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
        <ChatInput
          input={input}
          setInput={setInput}
          setMessages={setMessages}
        />
      </Grid2>
    </Grid2>
  );
};

export default Chat;
