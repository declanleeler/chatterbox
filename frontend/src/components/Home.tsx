import { FC } from 'react';
import { useAuth } from '../contexts/AuthProvider';

const Home: FC = () => {
  const { user } = useAuth();

  return (
    <div>
      hel Welcome to the Home Page! You are logged in as {user?.login}, id{' '}
      {user?.id}{' '}
    </div>
  );
};

export default Home;
