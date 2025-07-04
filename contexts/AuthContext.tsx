"use client";

import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  isActive: boolean;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isLoading: boolean;
  validateContext: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem('admin_token');
      const storedUser = localStorage.getItem('admin_user');
      
      if (storedToken && storedUser) {
        try {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
          // Note: Token validation will happen in ProtectedRoute when needed
        } catch (error) {
          console.error('Error parsing stored user:', error);
          localStorage.removeItem('admin_token');
          localStorage.removeItem('admin_user');
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const validateStoredToken = useCallback(async (token: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/admin/context', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.valid && data.user) {
          setUser(data.user);
          return true;
        }
      }
      // If invalid, clear user/token
      setUser(null);
      setToken(null);
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_user');
      return false;
    } catch (error) {
      console.error('Token validation error:', error);
      setUser(null);
      setToken(null);
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_user');
      return false;
    }
  }, []);

  const validateContext = useCallback(async (): Promise<boolean> => {
    if (!token) return false;
    return await validateStoredToken(token);
  }, [token, validateStoredToken]);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.error || 'Login failed' };
      }

      setToken(data.token);
      setUser(data.user);
      
      localStorage.setItem('admin_token', data.token);
      localStorage.setItem('admin_user', JSON.stringify(data.user));
      
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Network error. Please try again.' };
    }
  };

  const logout = () => {
    console.log('Logout called');
    setToken(null);
    setUser(null);
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    console.log('Logout completed');
  };

  const value = {
    user,
    token,
    login,
    logout,
    isLoading,
    validateContext
  };

  console.log('AuthContext state:', { user, token, isLoading });

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 