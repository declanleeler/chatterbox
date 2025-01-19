import axios from 'axios';
import { NewChat } from '../interfaces/Chat';

interface ChatResponse {
  chatId: string;
}

const createChat = async (
  chat: NewChat,
  token: string,
): Promise<ChatResponse> => {
  const response = await axios.post(
    '/api/create_chat',
    {
      chat,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
};

export default createChat;
