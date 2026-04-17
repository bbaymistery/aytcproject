import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <>
      <Header />
      <main className={isHome ? 'home-page-main' : 'main-container'}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;

