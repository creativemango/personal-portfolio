import React, { createContext, useContext, useState, useEffect } from 'react';
import { checkAuth, login as authLogin, logout as authLogout, register as authRegister } from '../services/authService';
import { notificationService } from '../services/notificationService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [unreadNotifications, setUnreadNotifications] = useState(0);

  // Poll for notifications
  useEffect(() => {
    let intervalId;

    const fetchUnreadCount = async () => {
      if (user) {
        try {
          const count = await notificationService.getUnreadCount();
          setUnreadNotifications(Number(count));
        } catch (error) {
          console.error('Failed to fetch unread notifications:', error);
        }
      } else {
        setUnreadNotifications(0);
      }
    };

    if (user) {
      fetchUnreadCount(); // Fetch immediately
      intervalId = setInterval(fetchUnreadCount, 30000); // Poll every 30s
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [user]);

  useEffect(() => {
    const initAuth = async () => {
      try {
        console.log('AuthProvider: Starting authentication check...');
        
        // 1. Check localStorage first
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');
        
        if (storedUser && storedToken) {
          try {
            const userData = JSON.parse(storedUser);
            setUser(userData);
            // Don't set loading to false yet if we want to verify with API in background?
            // App.jsx set it to false immediately. Let's stick to that for performance.
            setLoading(false);
            console.log('AuthProvider: User loaded from localStorage');
            
            // Optional: Verify token validity in background
            checkAuth().then(verifiedUser => {
              if (!verifiedUser) {
                console.log('AuthProvider: Token expired or invalid, logging out');
                setUser(null);
                localStorage.removeItem('user');
                localStorage.removeItem('token');
              }
            });
            return; 
          } catch (e) {
            console.error('AuthProvider: Error parsing stored user:', e);
            localStorage.removeItem('user');
          }
        }
        
        // 2. Verify with API if not found in local storage or parse error
        const userData = await checkAuth();
        if (userData) {
          setUser(userData);
          if (!localStorage.getItem('user')) {
            localStorage.setItem('user', JSON.stringify(userData));
          }
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('AuthProvider: Error checking auth:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (username, password) => {
    try {
      const data = await authLogin(username, password);
      if (data && data.user) {
        setUser(data.user);
      }
      return data;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authLogout();
    } finally {
      setUser(null);
    }
  };

  const register = async (username, password, email) => {
    return authRegister(username, password, email);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, login, logout, register, unreadNotifications, setUnreadNotifications }}>
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
