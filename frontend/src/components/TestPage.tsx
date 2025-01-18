import { Box, Button, Grid2, Typography } from '@mui/material';
import { FC } from 'react';

const TestPage: FC = () => {
  return (
    // <Grid2
    //   container
    //   sx={{ height: '100vh', width: '100vh' }}
    //   alignItems="flex-start"
    // >
    //   <div style={{ border: '1px solid blue' }}>hello</div>;
    // </Grid2>
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100vw',
        textAlign: 'center',
        gap: 2,
        padding: 2,
        boxSizing: 'border-box',
      }}
    >
      <Typography
        variant="h1"
        sx={{ fontSize: { xs: '2rem', sm: '3rem', md: '4rem' } }}
      >
        Welcome to Chatterbox
      </Typography>
      <Button variant="contained" color="primary">
        Sign in with GitHub
      </Button>
    </Box>
  );
};

export default TestPage;
