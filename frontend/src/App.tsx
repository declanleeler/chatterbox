import { FC } from 'react';
import AppRouter from './routes/router';
import AuthProvider from './contexts/AuthProvider';
import CustomThemeProvider from './contexts/CustomThemeProvider';

const App: FC = () => {
  return (
    <AuthProvider>
      <CustomThemeProvider>
        <AppRouter />
      </CustomThemeProvider>
    </AuthProvider>
  );
};

export default App;
