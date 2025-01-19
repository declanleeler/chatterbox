import { Box, CircularProgress, Typography } from '@mui/material';
import { FC, useEffect } from 'react';

const AuthRedirect: FC = () => {
  useEffect(() => {
    const state = Math.random().toString(36).substring(2);
    localStorage.setItem('state', state);

    const isLocal = window.location.hostname === 'localhost';

    const redirectUri = isLocal
      ? 'http://localhost:5173/oauth/callback'
      : 'https://chatterbox-frontend-ochre.vercel.app/oauth/callback';

    const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID;
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&response_type=code&scope=repo&redirect_uri=${redirectUri}&state=${state}`;

    window.location.href = githubAuthUrl;
  }, []);

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
      <CircularProgress />
      <Typography variant="h1">Redirecting to GitHub..</Typography>
    </Box>
  );
};

export default AuthRedirect;
