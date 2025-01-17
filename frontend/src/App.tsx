import { FC } from 'react';
import AppRouter from './routes/router';
import AuthProvider from './contexts/AuthProvider';

const App: FC = () => {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
};

export default App;
