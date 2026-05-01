import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    // Support both signatures: login(token, user) or login(userData)
    if (typeof userData === 'string' || typeof userData === 'number') {
      // called as login(token, user) - not supported here
      return;
    }

    // If called with two args (token, user) the caller should pass an object instead.
    const token = userData.token || localStorage.getItem('token');
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    if (token) localStorage.setItem('token', token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children} {/* ✅ lowercase 'children' */}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
