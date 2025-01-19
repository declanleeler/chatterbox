import axios from 'axios';

const fetchGithubOauth = async (code: string) => {
  const response = await axios.post('/api/oauth/redirect', {
    code,
  });
  return response;
};

export default fetchGithubOauth;
