import axios from 'axios';
import { Chat } from '../interfaces/Chat';

interface ChatResponse {
  chat: Chat;
}

const createChat = async (chat: Chat): Promise<ChatResponse> => {
  const response = await axios.post('/api/create_chat', {
    chat,
  });
  return response.data;
};

export default createChat;
