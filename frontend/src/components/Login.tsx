import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

const Login: FC = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/auth-redirect');
  };

  return (
    <div>
      <h1>Welcome to the App</h1>
      <button onClick={handleLoginClick}>Log in with GitHub</button>
    </div>
  );
};

export default Login;
