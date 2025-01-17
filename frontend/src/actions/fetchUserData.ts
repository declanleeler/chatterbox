import axios from 'axios';

export interface GitHubUserData {
  avatar_url: string;
  id: string;
  login: string;
}

const fetchUserData = async (token: string): Promise<GitHubUserData> => {
  console.log('fetching user data');
  const response = await axios.get('https://api.github.com/user', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export default fetchUserData;
