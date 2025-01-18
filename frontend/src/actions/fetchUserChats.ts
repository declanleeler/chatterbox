import axios from 'axios';
import { Chat } from '../interfaces/Chat';

interface FetchUserChatResponse {
  chats: Chat[];
}

const fetchUserChats = async (
  userId: number,
): Promise<FetchUserChatResponse> => {
  const response = await axios.post('/api/chats', {
    userId,
  });
  return response.data;
};

export default fetchUserChats;
