import { Box, Button, Typography } from '@mui/material';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

const Login: FC = () => {
  const navigate = useNavigate();
  const handleLoginClick = () => {
    navigate('/auth-redirect');
  };

  return (
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
      <Button variant="contained" color="primary" onClick={handleLoginClick}>
        Sign in with GitHub
      </Button>
    </Box>
  );
};

export default Login;
