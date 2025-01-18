import { Grid2, Paper, Typography } from '@mui/material';
import { FC } from 'react';

const NoSelectedChat: FC = () => {
  return (
    <Grid2 container justifyContent="center" alignItems="center">
      <Paper>
        <Typography variant="h4" sx={{ textAlign: 'center' }}>
          Select or start a chat to begin
        </Typography>
      </Paper>
    </Grid2>
  );
};
export default NoSelectedChat;
