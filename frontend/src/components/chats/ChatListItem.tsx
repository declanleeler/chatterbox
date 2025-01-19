import { FC } from 'react';
import { Chat } from '../../interfaces/Chat';
import { ListItemButton, ListItemText, useTheme } from '@mui/material';
import { DateTime } from 'luxon';

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
      <ListItemText
        primary={chat.name}
        secondary={DateTime.fromMillis(chat.createdOn).toFormat(
          'dd/MM/yyyy HH:mm',
        )}
      />
    </ListItemButton>
  );
};

export default ChatListItem;
