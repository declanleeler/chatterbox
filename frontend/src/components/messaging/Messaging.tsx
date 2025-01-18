import { FC } from 'react';
import NoSelectedChat from './NoSelectedChat';
import SelectedChatMessages from './SelectedChatMessages';

interface MessagingProps {
  selectedChat: string | null;
}

const Messaging: FC<MessagingProps> = ({ selectedChat }) => {
  if (!selectedChat) {
    return <NoSelectedChat />;
  }
  return <SelectedChatMessages selectedChat={selectedChat} />;
};

export default Messaging;
