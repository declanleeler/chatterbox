import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthProvider';

const ProtectedRoute: FC = () => {
  const { token } = useAuth();

  return token ? (
    <>
      <Outlet />
    </>
  ) : (
    <Navigate to="/" replace />
  );
};

export default ProtectedRoute;
