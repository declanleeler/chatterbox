import { FC } from 'react';
import { Chat } from '../../interfaces/Chat';
import { Typography } from '@mui/material';

interface ChatButtonProps {
  chat: Chat;
}
const ChatListItem: FC<ChatButtonProps> = ({ chat }) => {
  return (
    <div
      style={{
        width: '100%',
        height: '24px',
        display: 'flex',
        padding: '8px',
        paddingLeft: '16px',
        paddingRight: '16px',
        gap: 2,
        alignItems: 'center',
      }}
    >
      <Typography variant="h6">{chat.name}</Typography>
    </div>
  );
};

export default ChatListItem;
