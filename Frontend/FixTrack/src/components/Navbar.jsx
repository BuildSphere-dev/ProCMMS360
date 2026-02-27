import React from 'react';
import { Bell, Search, User } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

const Navbar = ({ title }) => {
  const user = useAuthStore((s) => s.user);

  return (
    <header className="navbar">
      <h2 className="navbar-title">{title}</h2>
      <div className="navbar-right">
        <div className="search-wrap" style={{ display: 'none' }}>
          <Search size={16} />
          <input className="navbar-search" type="text" placeholder="Search..." />
        </div>
        <button className="icon-btn" title="Notifications">
          <Bell size={20} />
          <span className="notification-dot" />
        </button>
        <div className="user-pill">
          <div style={{ textAlign: 'right' }}>
            <div className="user-name">{user?.name || 'Admin'}</div>
            <div className="user-role">{user?.role || 'Manager'}</div>
          </div>
          <div className="user-avatar">
            <User size={20} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
