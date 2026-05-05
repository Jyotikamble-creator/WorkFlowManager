import { createContext, useContext, useState } from 'react';

// Create a context for authentication
const AuthContext = createContext();

// AuthProvider wraps the app and provides authentication state and functions
export const AuthProvider = ({ children }) => {
  // State to store the current user
  const [user, setUser] = useState(null);

  // Login function: saves user and token to state and localStorage
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

  // Logout function: clears user and token from state and localStorage
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  // Provide user, login, and logout to children
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children} {/* ✅ lowercase 'children' */}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);
