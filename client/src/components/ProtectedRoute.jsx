import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppContext } from '../contexts/AppProvider';

const ProtectedRoute = () => {
  const { user } = useAppContext();
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
