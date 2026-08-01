import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);
const STORAGE_KEY = 'demo_app_phone';

export function AuthProvider({ children }) {
  const [phone, setPhone] = useState(() => localStorage.getItem(STORAGE_KEY));

  useEffect(() => {
    if (phone) {
      localStorage.setItem(STORAGE_KEY, phone);
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [phone]);

  const login = (validatedPhone) => setPhone(validatedPhone);
  const logout = () => setPhone(null);

  const value = {
    phone,
    isLoggedIn: Boolean(phone),
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}
