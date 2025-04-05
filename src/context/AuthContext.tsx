import { createContext, useContext, useState, useEffect } from 'react';

// Types
type User = {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  profileImage?: string; // Added this optional property
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
  error: string | null;
};

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Sample users for demonstration
const sampleUsers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'user@example.com',
    password: 'password',
    role: 'user' as const,
    profileImage: '/placeholder.svg' // Added default image
  },
  {
    id: '2',
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin' as const,
    profileImage: '/placeholder.svg' // Added default image
  }
];

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check for stored user on initial load
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find user with matching credentials
      const matchedUser = sampleUsers.find(
        user => user.email === email && user.password === password
      );
      
      if (matchedUser) {
        const { password, ...userWithoutPassword } = matchedUser;
        setUser(userWithoutPassword);
        localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if email already exists
      if (sampleUsers.some(user => user.email === email)) {
        throw new Error('Email already in use');
      }
      
      // Create new user (in a real app, this would be sent to a backend)
      const newUser = {
        id: (sampleUsers.length + 1).toString(),
        name,
        email,
        role: 'user' as const,
        profileImage: '/placeholder.svg' // Added default image
      };
      
      // Add to sample users (this is just for demo)
      sampleUsers.push({ ...newUser, password });
      
      // Log in the new user
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
