import { FC } from 'react';
import { Chat } from '../../interfaces/Chat';
import { ListItemButton, Typography, useTheme } from '@mui/material';

interface ChatButtonProps {
  chat: Chat;
  setSelectedChat: React.Dispatch<React.SetStateAction<string | null>>;
  isHighlighted: boolean;
}
const ChatListItem: FC<ChatButtonProps> = ({
  chat,
  setSelectedChat,
  isHighlighted,
}) => {
  const theme = useTheme();
  return (
    <ListItemButton
      className="chat-item-button"
      sx={{
        width: '100%',
        gap: 2,
        alignItems: 'center',
        borderRadius: 1,
        backgroundColor: isHighlighted
          ? theme.palette.action.selected
          : 'transparent',
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
