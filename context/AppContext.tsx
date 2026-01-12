import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode
} from 'react';
import { User, UserRole } from '../types';

/* =======================
   Types
======================= */

interface Announcement {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
  important: boolean;
}

interface AppContextType {
  user: User | null;
  isAuthenticated: boolean;
  role: UserRole;

  theme: 'light' | 'dark';
  lowDataMode: boolean;

  login: (role: UserRole, matricNo: string, email: string) => void;
  logout: () => void;
  signup: (matricNo: string, email: string, role: UserRole) => void;
  resetPassword: (email: string) => Promise<void>;

  toggleTheme: () => void;
  toggleLowDataMode: () => void;

  announcements: Announcement[];
  postAnnouncement: (title: string, content: string) => void;
  approveResource: (resourceId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

/* =======================
   Provider
======================= */

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  /* ---------- State ---------- */

  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('engihub_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
    return (
      savedTheme ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light')
    );
  });

  const [lowDataMode, setLowDataMode] = useState<boolean>(() => {
    return localStorage.getItem('lowDataMode') === 'true';
  });

  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  /* ---------- Effects ---------- */

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('lowDataMode', lowDataMode.toString());
  }, [lowDataMode]);

  /* =======================
     AUTH (ADMIN LOCK)
  ======================= */

  const login = (role: UserRole, matricNo: string, email: string) => {
    const MASTER_ADMIN_MATRIC = '19/ENG02/XXX'; // 🔒 YOUR REAL MATRIC

    if (role === 'ADMIN' && matricNo !== MASTER_ADMIN_MATRIC) {
      alert('Unauthorized: Admin access restricted.');
      return;
    }

    const userObj: User = {
      id: Date.now().toString(),
      matricNo,
      email,
      role
    };

    setUser(userObj);
    localStorage.setItem('engihub_user', JSON.stringify(userObj));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('engihub_user');
  };

  /* ---------- Signup ---------- */

  const signup = (matricNo: string, email: string, role: UserRole) => {
    const newUser: User = {
      id: Date.now().toString(),
      matricNo,
      email,
      role
    };

    setUser(newUser);
    localStorage.setItem('engihub_user', JSON.stringify(newUser));
  };

  const resetPassword = async (_email: string) => {
    return new Promise<void>((resolve) => setTimeout(resolve, 1500));
  };

  /* ---------- Settings ---------- */

  const toggleTheme = () =>
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

  const toggleLowDataMode = () => setLowDataMode((prev) => !prev);

  /* =======================
     Admin Features
  ======================= */

  const postAnnouncement = (title: string, content: string) => {
    const newAnnouncement: Announcement = {
      id: Date.now(),
      title,
      content,
      author: 'Admin Office',
      date: 'Just now',
      important: true
    };

    setAnnouncements((prev) => [newAnnouncement, ...prev]);
    alert('Announcement broadcasted!');
  };

  const approveResource = (resourceId: string) => {
    alert(`Resource ${resourceId} approved.`);
  };

  /* ---------- Provider ---------- */

  return (
    <AppContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        role: user?.role || 'GUEST',
        theme,
        lowDataMode,
        login,
        logout,
        signup,
        resetPassword,
        toggleTheme,
        toggleLowDataMode,
        announcements,
        postAnnouncement,
        approveResource
      }}
    >
      {children}
    </AppContext.Provider>
  );
};


export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
