import { FC } from 'react';
import { Message } from '../../interfaces/Message';
import { List, ListItem, ListItemText, Paper } from '@mui/material';

interface MessageListProps {
  messages: Message[];
}

const MessageList: FC<MessageListProps> = ({ messages }) => {
  return (
    <List>
      {messages.map((message) => (
        <ListItem>
          <Paper>
            <ListItemText>{message.messageText}</ListItemText>
          </Paper>
        </ListItem>
      ))}
    </List>
  );
};

export default MessageList;
