import {
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Tooltip,
} from '@mui/material';
import AddCommentIcon from '@mui/icons-material/AddComment';
import { FC, useState } from 'react';
import { useAuth } from '../../contexts/AuthProvider';
import { NewChat } from '../../interfaces/Chat';
import { DateTime } from 'luxon';
import createChat from '../../actions/createChat';
import { useQueryClient } from '@tanstack/react-query';

interface CreateChatButtonProps {
  setSelectedChat: React.Dispatch<React.SetStateAction<string | null>>;
}

const CreateChatButton: FC<CreateChatButtonProps> = ({ setSelectedChat }) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const handleOpenDialogue = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };
  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();
    if (!user) {
      return;
    }
    const formData = new FormData(event.currentTarget);
    const chatName = formData.get('chatName') as string;

    if (!chatName.trim()) return;

    const newChat: NewChat = {
      userId: user.id,
      name: chatName,
      createdOn: DateTime.now().toMillis() as EpochTimeStamp,
    };

    try {
      const response = await createChat(newChat);
      console.log(response);
      handleCloseDialog();
      setSelectedChat(response.chatId);
      queryClient.invalidateQueries({ queryKey: ['userChats'] });
    } catch (error) {
      console.error('Failed to create chat:', error);
    }
  };

  return (
    <>
      <Tooltip title="Create New Chat">
        <IconButton
          size="large"
          edge="end"
          aria-haspopup="true"
          color="inherit"
          onClick={handleOpenDialogue}
        >
          <AddCommentIcon />
        </IconButton>
      </Tooltip>

      <Dialog
        open={open}
        onClose={handleCloseDialog}
        PaperProps={{
          sx: { width: '500px', maxWidth: '90%' }, // Set custom width here
        }}
      >
        <DialogTitle>Create New Chat</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              autoFocus
              required
              margin="dense"
              id="chat-name"
              name="chatName"
              placeholder="Enter chat name here. (Max 50 chars)"
              slotProps={{ htmlInput: { maxLength: 50 } }}
              type="string"
              fullWidth
              variant="standard"
            />
            <DialogActions>
              <Button onClick={handleCloseDialog}>Cancel</Button>
              <Button type="submit">Create</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateChatButton;
