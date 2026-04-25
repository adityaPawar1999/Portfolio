import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

const Layout = () => {
  const location = useLocation();
  const showNavbar = location.pathname === '/' || location.pathname === '/about' || location.pathname.startsWith('/blog') || location.pathname === '/ChatbotUI';

  return (
    <>
      {showNavbar && <Navbar />}
      <Outlet />
    </>
  );
};

export default Layout;
