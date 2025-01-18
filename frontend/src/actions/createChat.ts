import axios from 'axios';
import { NewChat } from '../interfaces/Chat';

interface ChatResponse {
  chat: NewChat;
}

const createChat = async (chat: NewChat): Promise<ChatResponse> => {
  const response = await axios.post('/api/create_chat', {
    chat,
  });
  return response.data;
};

export default createChat;
