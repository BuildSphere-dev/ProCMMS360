import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const Layout = ({ children, title }) => (
  <div className="app-layout">
    <Sidebar />
    <div className="main-area">
      <Navbar title={title} />
      <main className="page-content">
        {children}
      </main>
    </div>
  </div>
);

export default Layout;
