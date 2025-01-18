import { Paper } from '@mui/material';
import { FC } from 'react';
import ConversationButton from './conversation/ConversationButton';
import NewHistory from './conversation/NewHistory';
import { Conversation } from '../interfaces/Conversation';

const conversation: Conversation[] = [
  {
    userId: '10dsfjh9435WERFS',
    name: 'convo 1',
    createdOn: 1737195438900,
  },
  {
    userId: '10dsfjh9435WERFS',
    name: 'convo 2',
    status: 'ready',
    createdOn: 1737195438900,
  },
];

const HistoryPanel: FC = () => {
  return (
    <Paper sx={{ minHeight: '100vh' }}>
      <NewHistory />
      {conversation.map((convo) => {
        return <ConversationButton convo={convo} />;
      })}
    </Paper>
  );
};

export default HistoryPanel;
