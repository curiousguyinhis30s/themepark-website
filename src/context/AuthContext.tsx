import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { validateDemoCredentials } from '@themepark/shared';

interface Visitor {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  membershipTier?: 'guest' | 'silver' | 'gold' | 'platinum';
}

interface AuthContextType {
  visitor: Visitor | null;
  isAuthenticated: boolean;
  isDemoMode: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [visitor, setVisitor] = useState<Visitor | null>(null);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const storedVisitor = localStorage.getItem('visitor_user');
    const storedDemoMode = localStorage.getItem('visitor_demo_mode');
    if (storedVisitor) {
      try {
        setVisitor(JSON.parse(storedVisitor));
        setIsDemoMode(storedDemoMode === 'true');
      } catch {
        localStorage.removeItem('visitor_user');
        localStorage.removeItem('visitor_demo_mode');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Try demo credentials from shared package
    const demoUser = validateDemoCredentials(email, password);

    if (demoUser && demoUser.role === 'visitor') {
      const visitorData: Visitor = {
        id: demoUser.id,
        email: demoUser.email,
        name: demoUser.name,
        avatar: demoUser.avatar,
        membershipTier: demoUser.membershipTier,
      };

      setVisitor(visitorData);
      setIsDemoMode(true);
      localStorage.setItem('visitor_user', JSON.stringify(visitorData));
      localStorage.setItem('visitor_demo_mode', 'true');
      return true;
    }

    return false;
  };

  const logout = () => {
    setVisitor(null);
    setIsDemoMode(false);
    localStorage.removeItem('visitor_user');
    localStorage.removeItem('visitor_demo_mode');
  };

  return (
    <AuthContext.Provider
      value={{
        visitor,
        isAuthenticated: !!visitor,
        isDemoMode,
        loading,
        login,
        logout,
      }}
    >
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
