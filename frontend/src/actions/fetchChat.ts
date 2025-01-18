import axios from 'axios';
import { Message } from '../interfaces/Message';

interface ChatResponse {
  message: Message;
}

const fetchChat = async (message: Message): Promise<ChatResponse> => {
  const response = await axios.post('/api/chat', {
    message,
  });
  return response.data;
};

export default fetchChat;
