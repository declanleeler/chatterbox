import axios from 'axios';
import { NewChat } from '../interfaces/Chat';

interface ChatResponse {
  chatId: string;
}

const createChat = async (chat: NewChat): Promise<ChatResponse> => {
  const response = await axios.post('/api/create_chat', {
    chat,
  });
  return response.data;
};

export default createChat;
