import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { login as loginRequest } from '../services/authService';
import type { LoginCredentials } from '../types';
import type { AuthUser } from '../types/dashboard';

const STORAGE_KEY = 'humboldt.auth.user';

interface LoginResult {
  success: boolean;
  message: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<LoginResult>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function buildDisplayName(username: string): string {
  const trimmed = username.trim();
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setUser(JSON.parse(stored) as AuthUser);
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials: LoginCredentials): Promise<LoginResult> => {
    const result = await loginRequest(credentials);
    if (result.success && result.role) {
      const authUser: AuthUser = {
        id: credentials.username.trim().toLowerCase(),
        username: credentials.username.trim(),
        nombre: buildDisplayName(credentials.username),
        role: result.role,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(authUser));
      setUser(authUser);
    }
    return { success: result.success, message: result.message };
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
}
