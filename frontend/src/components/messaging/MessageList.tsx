import { FC } from 'react';
import { Message } from '../../interfaces/Message';
import { List, ListItem, ListItemText, Paper, Typography } from '@mui/material';
import ReactMarkdown from 'react-markdown';

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
          <ListItem
            key={`${message.userId}_${message.createdOn}`}
            sx={{
              display: 'flex',
              justifyContent:
                message.userId === 10101010 ? 'flex-start' : 'flex-end',
            }}
          >
            <Paper sx={{ padding: 2, maxWidth: '80%' }}>
              {/* <ListItemText>{message.messageText}</ListItemText> */}
              <Paper sx={{ padding: 2, maxWidth: '80%' }}>
                <ReactMarkdown>{message.messageText}</ReactMarkdown>
              </Paper>
            </Paper>
          </ListItem>
        ))
      )}
    </List>
  );
};

export default MessageList;
