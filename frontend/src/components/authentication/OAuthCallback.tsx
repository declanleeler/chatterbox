import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, CircularProgress, Typography } from '@mui/material';
import fetchGithubOauth from '../../actions/fetchGithubOauth';
import { useAuth } from '../../contexts/AuthProvider';

const OAuthCallback: FC = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  useEffect(() => {
    const handleOauth = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      const state = urlParams.get('state');

      const storedState = localStorage.getItem('state');
      if (storedState !== state) {
        console.error('CSRF token mismatch');
        return;
      }

      if (code) {
        try {
          const data = await fetchGithubOauth(code);
          const { token, user } = data;

          setAuth(token, user);

          navigate('/home');
        } catch (error) {
          console.error('Error handling OAuth callback:', error);
        }
      }
    };

    handleOauth();
  }, [navigate]);

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
      <Typography variant="h1">Processing GitHub callback...</Typography>
    </Box>
  );
};

export default OAuthCallback;
