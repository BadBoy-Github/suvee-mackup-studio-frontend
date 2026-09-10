import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

interface AdminContextType {
  isAuthenticated: boolean;
  email: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const storedEmail = localStorage.getItem('adminEmail');
    if (token && storedEmail) {
      setIsAuthenticated(true);
      setEmail(storedEmail);
    }
  }, []);

  const login = async (emailInput: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: emailInput, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        console.error(data.message || 'Login failed');
        return false;
      }

      const data = await response.json();
      localStorage.setItem('adminToken', data.token);
      localStorage.setItem('adminEmail', data.email);
      setIsAuthenticated(true);
      setEmail(data.email);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setEmail(null);
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminEmail');
  };

  return (
    <AdminContext.Provider value={{ isAuthenticated, email, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}
