import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState(true);

  const verifyToken = async (authToken) => {
    if (!authToken) return false;
    try {
      const response = await fetch('http://127.0.0.1:8000/token/verify/', {
        method: 'POST',
        headers: {
          'Authorization': `${authToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token: authToken }),
      });

      if (!response.ok) {
        throw new Error('Token invalid');
      }

      const data = await response.json();
      // The response will contain the user object directly
      setUser(data.user); // Will contain id, email, username, is_superuser
      return true;
    } catch (error) {
      console.error('Token verification failed:', error);
      setToken(null);
      localStorage.removeItem('token');
      return false;
    }
  };

  // Verify token on initial load and when token changes
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

      const response = await fetch('http://127.0.0.1:8000/token/', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      setToken(data.access);
      localStorage.setItem('token', data.access);
      setUser({ username });
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