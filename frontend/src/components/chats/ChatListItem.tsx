import { FC } from 'react';
import { Chat } from '../../interfaces/Chat';
import { ListItemButton, Typography } from '@mui/material';

interface ChatButtonProps {
  chat: Chat;
  setSelectedChat: React.Dispatch<React.SetStateAction<string | null>>;
}
const ChatListItem: FC<ChatButtonProps> = ({ chat, setSelectedChat }) => {
  return (
    <ListItemButton
      className="chat-item-button"
      sx={{
        width: '100%',
        gap: 2,
        alignItems: 'center',
        borderRadius: 1,
        '&:hover': {
          borderRadius: 1,
        },
      }}
      onClick={() => {
        setSelectedChat(chat._id);
      }}
    >
      <Typography
        variant="h6"
        sx={{
          width: '100%',
          height: '24px',
          paddingLeft: '16px',
          paddingRight: '16px',
          // gap: 2,
        }}
      >
        {chat.name}
      </Typography>
    </ListItemButton>
  );
};

export default ChatListItem;
