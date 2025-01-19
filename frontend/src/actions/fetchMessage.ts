import axios from 'axios';
import { Message } from '../interfaces/Message';

interface MessageResponse {
  message: Message;
}

interface FetchMessageProps {
  message: Message;
  history?: Message[];
}

const fetchMessage = async ({
  message,
  history,
}: FetchMessageProps): Promise<MessageResponse> => {
  const response = await axios.post('/api/message', {
    message,
    history,
  });
  return response.data;
};

export default fetchMessage;
