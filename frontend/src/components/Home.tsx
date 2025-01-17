import { FC } from 'react';
import { useAuth } from '../contexts/AuthProvider';
import { useNavigate } from 'react-router-dom';

const Home: FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div>
      Welcome to the Home Page! You are logged in as {user?.login}, id{' '}
      {user?.id}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
