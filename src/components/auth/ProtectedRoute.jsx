import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

// Componente para proteger rutas que requieren autenticación
export const ProtectedRoute = () => {
  const { user, loading } = useAuth();
  
  // Mientras se verifica la autenticación, mostramos un loader
  if (loading) return <div className="loading">Cargando...</div>;
  
  // Si no hay usuario autenticado, redirigimos a login
  if (!user) return <Navigate to="/login" replace />;
  
  // Si hay usuario, mostramos el contenido de la ruta
  return <Outlet />;
};

// Componente para redirigir usuarios autenticados (ej: login, landing)
export const RedirectIfAuthenticated = ({ children }) => {
  const { user, loading } = useAuth();
  
  // Mientras se verifica la autenticación, mostramos un loader
  if (loading) return <div className="loading">Cargando...</div>;
  
  // Si hay usuario autenticado, redirigimos a profiles
  if (user) return <Navigate to="/profiles" replace />;
  
  // Si no hay usuario, mostramos el contenido normal
  return children;
};
