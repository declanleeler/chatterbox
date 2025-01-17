import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation after successful login
import fetchGithubOauth from '../actions/fetchGithubOauth';

const OAuthCallback: FC = () => {
  const navigate = useNavigate();

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

          // Store token and user in localStorage
          localStorage.setItem('authToken', token);
          if (user) {
            localStorage.setItem('user', JSON.stringify(user));
          }

          // Redirect to the dashboard or protected route
          navigate('/home'); // Use navigate() for client-side routing
        } catch (error) {
          console.error('Error handling OAuth callback:', error);
        }
      }
    };

    handleOauth();
  }, [navigate]);

  return <div>Processing GitHub callback...</div>;
};

export default OAuthCallback;
