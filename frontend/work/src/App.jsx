import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './context/AuthContext';

// App is the root component of the frontend
// It wraps the app in AuthProvider (for authentication context)
// and sets up routing using React Router
function App() {
  return (
    <AuthProvider>
      <Router>
        {/* All app routes are defined in AppRoutes */}
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
