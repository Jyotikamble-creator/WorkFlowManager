import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (data) => {
    // Handle response structure: { token, user: {...} }
    const token = data.token;
    const user = data.user;

    if (!token || !user) {
      console.error('Invalid login data structure');
      return;
    }

    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
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
