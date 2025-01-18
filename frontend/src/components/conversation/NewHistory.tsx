import { IconButton, Paper } from '@mui/material';
import AddCommentIcon from '@mui/icons-material/AddComment';
import { FC } from 'react';

const NewHistory: FC = () => {
  return (
    <Paper
      sx={{
        // width: '100%',
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
        // aria-controls={menuId}
        aria-haspopup="true"
        // onClick={handleProfileMenuOpen}
        color="inherit"
      >
        <AddCommentIcon />
        {/* <Avatar src={user?.avatar_url} alt={user?.login || 'User'} /> */}
      </IconButton>
    </Paper>
  );
};

export default NewHistory;
