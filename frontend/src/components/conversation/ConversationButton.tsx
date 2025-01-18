import { FC } from 'react';
import { Conversation } from '../../interfaces/Conversation';
import { Typography } from '@mui/material';
import { DateTime } from 'luxon';

interface ConversationButtonProps {
  convo: Conversation;
}
const ConversationButton: FC<ConversationButtonProps> = ({ convo }) => {
  const createdDate = DateTime.fromMillis(convo.createdOn).toLocaleString();
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
      <Typography variant="h6">{convo.name}</Typography>
      <Typography variant="body2">{createdDate}</Typography>
    </div>
  );
};

export default ConversationButton;
