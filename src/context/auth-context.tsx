import { createContext, useState, ReactNode } from 'react';
import type { AuthContextType, User } from '@/types';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const MOCK_USER: User = {
  id: 'mock-user-1',
  username: 'player1',
  email: 'player@allgames.dev',
  createdAt: new Date().toISOString(),
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(MOCK_USER);
  const [isLoading] = useState(false);

  const signIn = () => {
    setUser(MOCK_USER);
  };

  const signOut = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
