import { TextField } from '@mui/material';
import { FC } from 'react';

interface ChatInputProps {
  input: string | null;
  setInput: React.Dispatch<React.SetStateAction<string | null>>;
}

const ChatInput: FC<ChatInputProps> = ({ input, setInput }) => {
  return (
    <TextField
      id="filled-multiline-flexible"
      label="Your Message"
      multiline
      maxRows={4}
      variant="filled"
      value={input || ''}
      onChange={(e) => setInput(e.target.value)}
      fullWidth
    />
  );
};

export default ChatInput;
