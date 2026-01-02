import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'student';
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  loginAsRole: (role: 'admin' | 'student') => void;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  hasPurchasedCourse: (courseId: number) => boolean;
  purchaseCourse: (courseId: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo users
const demoUsers: User[] = [
  { id: '1', email: 'admin@quynhboki.vn', name: 'Admin Quỳnh', role: 'admin' },
  { id: '2', email: 'hocvien1@gmail.com', name: 'Nguyễn Văn A', role: 'student' },
  { id: '3', email: 'hocvien2@gmail.com', name: 'Trần Thị B', role: 'student' },
  { id: '4', email: 'hocvien3@gmail.com', name: 'Lê Văn C', role: 'student' },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [purchasedCourses, setPurchasedCourses] = useState<number[]>([]);

  useEffect(() => {
    // Check localStorage for existing session
    const savedUser = localStorage.getItem('quynh_boki_user');
    const savedPurchases = localStorage.getItem('quynh_boki_purchases');
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    if (savedPurchases) {
      setPurchasedCourses(JSON.parse(savedPurchases));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Demo login - accept any password for demo users
    const foundUser = demoUsers.find(u => u.email === email);
    if (foundUser || password === 'demo123') {
      const userToSet = foundUser || {
        id: Date.now().toString(),
        email,
        name: email.split('@')[0],
        role: 'student' as const
      };
      setUser(userToSet);
      localStorage.setItem('quynh_boki_user', JSON.stringify(userToSet));
      return true;
    }
    return false;
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    // Demo registration
    const newUser: User = {
      id: Date.now().toString(),
      email,
      name,
      role: 'student'
    };
    setUser(newUser);
    localStorage.setItem('quynh_boki_user', JSON.stringify(newUser));
    return true;
  };

  const loginAsRole = (role: 'admin' | 'student') => {
    const userToSet: User = role === 'admin' 
      ? { id: '1', email: 'admin@quynhboki.vn', name: 'Admin Quỳnh', role: 'admin' }
      : { id: '2', email: 'hocvien@quynhboki.vn', name: 'Học viên Demo', role: 'student' };
    setUser(userToSet);
    localStorage.setItem('quynh_boki_user', JSON.stringify(userToSet));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('quynh_boki_user');
  };

  const hasPurchasedCourse = (courseId: number): boolean => {
    // Admin always has access
    if (user?.role === 'admin') return true;
    return purchasedCourses.includes(courseId);
  };

  const purchaseCourse = (courseId: number) => {
    if (!purchasedCourses.includes(courseId)) {
      const newPurchases = [...purchasedCourses, courseId];
      setPurchasedCourses(newPurchases);
      localStorage.setItem('quynh_boki_purchases', JSON.stringify(newPurchases));
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      login,
      loginAsRole,
      register,
      logout,
      hasPurchasedCourse,
      purchaseCourse
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
