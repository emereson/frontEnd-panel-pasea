import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = () => {
  const partnerDataJSON = localStorage.getItem('partnerData');

  try {
    const partnerData = JSON.parse(partnerDataJSON);

    if (
      localStorage.getItem('token') &&
      partnerData?.status === 'active'
    ) {
      return <Outlet />;
    } else {
      return <Navigate to="/log-in" />;
    }
  } catch (error) {
    console.error('Error al analizar los datos del usuario:', error);
    return <Navigate to="/log-in" />;
  }
};

export default ProtectedRoutes;
