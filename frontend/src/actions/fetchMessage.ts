import axios from 'axios';
import { Message } from '../interfaces/Message';

interface MessageResponse {
  message: Message;
}

const fetchMessage = async (message: Message): Promise<MessageResponse> => {
  const response = await axios.post('/api/message', {
    message,
  });
  return response.data;
};

export default fetchMessage;
