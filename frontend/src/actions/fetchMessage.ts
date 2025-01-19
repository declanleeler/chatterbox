import axios from 'axios';
import { Message } from '../interfaces/Message';

interface MessageResponse {
  message: Message;
}

interface FetchMessageProps {
  message: Message;
  history?: Message[];
  token: string;
}

const backendBaseUrl =
  import.meta.env.VITE_BACKEND_URL || 'http://localhost:5173/api';

const fetchMessage = async ({
  message,
  history,
  token,
}: FetchMessageProps): Promise<MessageResponse> => {
  const response = await axios.post(
    `${backendBaseUrl}/message`,
    {
      message,
      history,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
};

export default fetchMessage;
