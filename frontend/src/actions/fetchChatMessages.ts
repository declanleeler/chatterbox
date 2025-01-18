import axios from 'axios';
import { Message } from '../interfaces/Message';

interface MessageResponse {
  messages: Message[];
}

const fetchChatMessages = async (chatId: string): Promise<MessageResponse> => {
  const response = await axios.get(`/api/chat/${chatId}`);
  return response.data;
};

export default fetchChatMessages;
