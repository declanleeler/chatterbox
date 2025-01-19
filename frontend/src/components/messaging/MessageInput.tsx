import { Box, Button, TextField, Typography, useTheme } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { DateTime } from 'luxon';
import { FC } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import fetchMessage from '../../actions/fetchMessage';
import { useAuth } from '../../contexts/AuthProvider';
import { Message } from '../../interfaces/Message';

interface MessageInputProps {
  selectedChat: string;
  input: string | null;
  setInput: React.Dispatch<React.SetStateAction<string | null>>;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

const MessageInput: FC<MessageInputProps> = ({
  selectedChat,
  input,
  setInput,
  setMessages,
}) => {
  const { user } = useAuth();
  const theme = useTheme();
  const latestMessageChatId = localStorage.getItem('latestMessageChatId');
  const shouldSendHistory =
    latestMessageChatId === null || selectedChat !== latestMessageChatId;

  const { mutate, isPending, isError } = useMutation({
    mutationFn: fetchMessage,
    onSuccess: (response) => {
      setMessages((prevMessages) => [...prevMessages, response.message]);
    },
    onError: (error) => {
      console.error('Error sending message:', error);
    },
  });

  const handleSendMessage = () => {
    if (input) {
      const userMessage: Message = {
        chatId: selectedChat,
        userId: user!.id,
        messageText: input,
        createdOn: DateTime.now().toMillis(),
      };
      setMessages((prevMessages) => {
        // Send the message first
        const updatedMessages = [...prevMessages, userMessage];

        // Mutate with the new message and optional history
        mutate({
          message: userMessage,
          history: shouldSendHistory ? updatedMessages.slice(-10) : undefined,
        });

        return updatedMessages; // Update state with the new message
      });

      if (shouldSendHistory) {
        localStorage.setItem('latestMessageChatId', selectedChat);
      }

      setInput(null);
    }
  };

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      {isPending && (
        <ThreeDots
          visible={true}
          height="20"
          width="20"
          color={theme.palette.text.primary}
          radius="9"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      )}
      {isError && (
        <Typography color={theme.palette.error.main}>
          There was an error, please try again.
        </Typography>
      )}
      <Box display="flex" alignItems="center" gap={2}>
        <TextField
          id="filled-multiline-flexible"
          label="Your Message"
          multiline
          maxRows={4}
          variant="filled"
          value={input || ''}
          onChange={(e) => setInput(e.target.value)}
          fullWidth
          sx={{ flexGrow: 1 }}
        />
        <Button
          onClick={handleSendMessage}
          variant="contained"
          sx={{ height: '100%' }}
          disabled={isPending}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default MessageInput;
