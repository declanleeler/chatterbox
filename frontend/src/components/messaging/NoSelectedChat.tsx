import { Grid2, Typography, useTheme } from '@mui/material';
import { FC } from 'react';

const NoSelectedChat: FC = () => {
  const theme = useTheme();
  return (
    <Grid2
      id="no-selected-chat"
      container
      justifyContent="center"
      alignItems="center"
      paddingBottom={60}
    >
      <Typography
        variant="h4"
        sx={{ textAlign: 'center', color: theme.palette.text.primary }}
      >
        Select or start a new chat to begin
      </Typography>
    </Grid2>
  );
};
export default NoSelectedChat;
