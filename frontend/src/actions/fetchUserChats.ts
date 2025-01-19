import axios from 'axios';
import { Chat } from '../interfaces/Chat';

interface FetchUserChatResponse {
  chats: Chat[];
}

const fetchUserChats = async (
  userId: number,
  token: string,
): Promise<FetchUserChatResponse> => {
  const response = await axios.post(
    '/api/chats',
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
