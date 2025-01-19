import axios from 'axios';

const backendBaseUrl =
  import.meta.env.VITE_BACKEND_URL || 'http://localhost:5173/api';

const fetchGithubOauth = async (code: string) => {
  const response = await axios.post(`${backendBaseUrl}/oauth/redirect`, {
    code,
  });
  return response;
};

export default fetchGithubOauth;
