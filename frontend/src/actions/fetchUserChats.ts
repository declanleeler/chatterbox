import axios from 'axios';
import { Chat } from '../interfaces/Chat';

interface FetchUserChatResponse {
  chats: Chat[];
}

const backendBaseUrl =
  import.meta.env.VITE_BACKEND_URL || 'http://localhost:5173/api';

const fetchUserChats = async (
  userId: number,
  token: string,
): Promise<FetchUserChatResponse> => {
  const response = await axios.post(
    `${backendBaseUrl}/chats`,
    {
      userId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
};

export default fetchUserChats;
