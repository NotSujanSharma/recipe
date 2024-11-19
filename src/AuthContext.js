import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState(true);

  const verifyToken = async (authToken) => {
    if (!authToken) return false;
    try {
      const response = await fetch('https://api.bigcityops.ca/token/verify/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token: authToken }),
      });

      if (!response.ok) {
        throw new Error('Token invalid');
      }

      const data = await response.json();
      setUser(data.user); // Contains id, email, username, is_superuser
      return true;
    } catch (error) {
      console.error('Token verification failed:', error);
      setToken(null);
      localStorage.removeItem('token');
      return false;
    }
  };

  useEffect(() => {
    const validateToken = async () => {
      setIsLoading(true);
      if (token) {
        await verifyToken(token);
      }
      setIsLoading(false);
    };

    validateToken();
  }, [token]);

  const login = async (username, password) => {
    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);

      const response = await fetch('https://api.bigcityops.ca/token/', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      setToken(data.access);
      localStorage.setItem('token', data.access);

      // Verify token immediately after login to get full user data including is_superuser
      await verifyToken(data.access);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout, verifyToken, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);