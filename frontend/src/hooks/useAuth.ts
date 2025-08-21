import { useState, useEffect } from 'react';
import { User } from '../types';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate auth check
    const savedUser = localStorage.getItem('finly_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate login
    const mockUser: User = {
      id: '1',
      name: email.split('@')[0],
      email,
      createdAt: new Date(),
    };
    setUser(mockUser);
    localStorage.setItem('finly_user', JSON.stringify(mockUser));
    return mockUser;
  };

  const register = async (name: string, email: string, password: string) => {
    // Simulate registration
    const mockUser: User = {
      id: '1',
      name,
      email,
      createdAt: new Date(),
    };
    setUser(mockUser);
    localStorage.setItem('finly_user', JSON.stringify(mockUser));
    return mockUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('finly_user');
  };

  const loginWithGoogle = async () => {
    // Simulate Google login
    const mockUser: User = {
      id: '1',
      name: 'Google User',
      email: 'user@gmail.com',
      createdAt: new Date(),
    };
    setUser(mockUser);
    localStorage.setItem('finly_user', JSON.stringify(mockUser));
    return mockUser;
  };

  return {
    user,
    isLoading,
    login,
    register,
    logout,
    loginWithGoogle,
  };
};