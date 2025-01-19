import axios from 'axios';
import { Message } from '../interfaces/Message';

interface MessageResponse {
  messages: Message[];
}

const fetchChatMessages = async (
  chatId: string,
  token: string,
): Promise<MessageResponse> => {
  const response = await axios.post(
    `/api/chat`,
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
