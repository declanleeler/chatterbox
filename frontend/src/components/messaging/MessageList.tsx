import { FC } from 'react';
import { Message } from '../../interfaces/Message';
import { List, ListItem, ListItemText, Paper, Typography } from '@mui/material';

interface MessageListProps {
  messages: Message[];
}

const MessageList: FC<MessageListProps> = ({ messages }) => {
  return (
    <List>
      {messages.length === 0 ? (
        <ListItem>
          <Paper sx={{ padding: 2, textAlign: 'center' }}>
            <Typography>No messages yet. Start the conversation!</Typography>
          </Paper>
        </ListItem>
      ) : (
        messages.map((message) => (
          <ListItem key={message.createdOn}>
            {/* Ensure a key is provided for each item */}
            <Paper sx={{ padding: 2 }}>
              <ListItemText>{message.messageText}</ListItemText>
            </Paper>
          </ListItem>
        ))
      )}
    </List>
  );
};

export default MessageList;
