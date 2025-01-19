import axios from 'axios';
import { NewChat } from '../interfaces/Chat';

interface ChatResponse {
  chatId: string;
}

const backendBaseUrl =
  import.meta.env.VITE_BACKEND_URL || 'http://localhost:5173/api';

const createChat = async (
  chat: NewChat,
  token: string,
): Promise<ChatResponse> => {
  const response = await axios.post(
    `${backendBaseUrl}/create_chat`,
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
