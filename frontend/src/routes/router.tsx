import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AuthRedirect from '../authentication/AuthRedirect';
import OAuthCallback from '../authentication/OAuthCallback';
import Home from '../components/Home';
import ProtectedRoute from '../components/ProtectedRoute';
import { useAuth } from '../contexts/AuthProvider';
import Login from '../components/Login';

const AppRouter = () => {
  const { user } = useAuth();

  const router = createBrowserRouter([
    {
      path: '/',
      element: user ? <Home /> : <Login />,
    },
    {
      path: '/auth-redirect',
      element: <AuthRedirect />,
    },
    {
      path: '/oauth/callback',
      element: <OAuthCallback />,
    },
    {
      element: <ProtectedRoute />,
      children: [
        {
          path: '/home',
          element: <Home />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;
