import axios from 'axios';
import { Message } from '../interfaces/Message';

interface MessageResponse {
  messages: Message[];
}

const backendBaseUrl =
  import.meta.env.VITE_BACKEND_URL || 'http://localhost:5173/api';

const fetchChatMessages = async (
  chatId: string,
  token: string,
): Promise<MessageResponse> => {
  console.log(chatId);
  const response = await axios.post(
    `${backendBaseUrl}/chat`,
    { chatId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
};

export default fetchChatMessages;
