import { FC, useEffect } from 'react';

const AuthRedirect: FC = () => {
  useEffect(() => {
    const state = Math.random().toString(36).substring(2);
    localStorage.setItem('state', state);

    const redirectUri = 'http://localhost:5173/oauth/callback';
    const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID;
    console.log(clientId);
    // const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&response_type=code&scope=repo&redirect_uri=${redirectUri}/integrations/github/oauth2/callback&state=${state}`;
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&response_type=code&scope=repo&redirect_uri=${redirectUri}&state=${state}`;

    window.location.href = githubAuthUrl;
  }, []);

  return <div>Redirecting to GitHub...</div>;
};

export default AuthRedirect;
