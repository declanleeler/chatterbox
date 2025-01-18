import { IconButton, Paper } from '@mui/material';
import AddCommentIcon from '@mui/icons-material/AddComment';
import { FC } from 'react';
import { useAuth } from '../../contexts/AuthProvider';
import { Chat } from '../../interfaces/Chat';
import { DateTime } from 'luxon';
import createChat from '../../actions/createChat';
import { useQueryClient } from '@tanstack/react-query';

const CreatChatButton: FC = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  console.log(user?.id);

  const handleGenerateChat = async (): Promise<void> => {
    const now = DateTime.now();
    const timestampInMillis = now.toMillis();

    const formattedTimestamp = now.toFormat('dd/MM/yy HH:mm:ss');

    const newChat: Chat = {
      userId: user!.id,
      name: `Chat - ${formattedTimestamp}`,
      createdOn: timestampInMillis as EpochTimeStamp,
    };

    try {
      const response = await createChat(newChat);
      console.log('Chat successfully created:', response.chat);
      queryClient.invalidateQueries({ queryKey: ['userChats'] });
    } catch (error) {
      console.error('Failed to create chat:', error);
    }
  };

  return (
    <Paper
      sx={{
        display: 'flex',
        minHeight: '48px',
        p: '8px',
        pr: '16px',
        justifyContent: 'right',
      }}
    >
      <IconButton
        size="large"
        edge="end"
        aria-label="account of current user"
        aria-haspopup="true"
        color="inherit"
        onClick={handleGenerateChat}
      >
        <AddCommentIcon />
      </IconButton>
    </Paper>
  );
};

export default CreatChatButton;
