import axios from 'axios';
import { GitHubUserData } from './fetchUserData';

interface GitHubOAuthResponse {
  token: string;
  tokenType: string;
  user: GitHubUserData;
}

const fetchGithubOauth = async (code: string) => {
  const response = await axios.post('/api/oauth/redirect', {
    code,
  });
  return response;
};

export default fetchGithubOauth;
