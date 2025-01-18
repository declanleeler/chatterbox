import { Box, Button, TextField } from '@mui/material';
import { FC } from 'react';
import fetchChat from '../../actions/fetchChat';
import { useMutation } from '@tanstack/react-query';
import { Message } from '../../interfaces/Message';
import { useAuth } from '../../contexts/AuthProvider';

interface ChatInputProps {
  input: string | null;
  setInput: React.Dispatch<React.SetStateAction<string | null>>;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

const ChatInput: FC<ChatInputProps> = ({ input, setInput, setMessages }) => {
  const { user } = useAuth();
  const { mutate, isPending } = useMutation({
    mutationFn: fetchChat,
    onSuccess: (response) => {
      console.log(response.message);
      setMessages((prevMessages) => [...prevMessages, response.message]);
    },
    onError: (error) => {
      console.error('Error sending message:', error);
    },
  });

  const handleSendMessage = () => {
    if (input) {
      const userMessage: Message = {
        conversationId: '1',
        userId: user!.id,
        messageText: input,
        createdOn: Date.now(),
      };

      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setInput(null);
      mutate(userMessage);
    }
  };

  return (
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
  );
};

export default ChatInput;
