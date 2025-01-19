import { createContext, useState, useContext, ReactNode, FC } from 'react';
import { User } from '../interfaces/User';

interface AuthContextType {
  token: string | null;
  user: User | null;
  setAuth: (token: string, user: any) => void;
  clearAuth: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const setAuth = (token: string, user: any) => {
    console.log('token', token);
    setToken(token);
    setUser(user);
  };

  const clearAuth = () => {
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, setAuth, clearAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthProvider;
