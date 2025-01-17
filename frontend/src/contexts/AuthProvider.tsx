import {
  createContext,
  useState,
  useContext,
  FC,
  ReactNode,
  useEffect,
} from 'react';
import { User } from '../interfaces/User';

interface AuthContextType {
  user: User | null;
  authToken: string | null;
  setAuth: (user: string, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [authToken, setAuthToken] = useState<string | null>(
    localStorage.getItem('authToken'),
  );

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    }
  }, []);

  const setAuth = (user: string, token: string) => {
    // Set the token
    setAuthToken(token);

    // Parse the user string to JSON and extract necessary fields
    const userJson = JSON.parse(user);

    setUser(userJson);

    // Store stringified user object and token in localStorage
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token); // Token is a string, so no need for JSON.stringify
  };

  const logout = () => {
    setUser(null);
    setAuthToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, authToken, setAuth, logout }}>
      <>{children}</>
    </AuthContext.Provider>
  );
};

export default AuthProvider;
