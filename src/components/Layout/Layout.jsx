import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../Navbar';
import Home from '../../pages/Home';
import About from '../../pages/About';

const Layout = () => {
  const location = useLocation();
  const showNavbar = location.pathname === '/' || location.pathname === '/about';

  return (
    <>
      {showNavbar && <Navbar />}
      <Outlet />
    <About />

    </>
  );
};

export default Layout;