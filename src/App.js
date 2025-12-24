import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import Dashboard from './Pages/Dashboard/Dashboard';
import './App.css';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isLoggedIn);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const IsLoggedIn = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isLoggedIn);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return children;
};

function App() {
  const theme = useSelector((s) => s.theme.theme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <Routes>
      <Route path="/" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      <Route path="/login" element={
        <IsLoggedIn>
          <Login />
        </IsLoggedIn>
      } />
      <Route path='/register' element={
        <IsLoggedIn>
          <Register />
        </IsLoggedIn>
      } />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
