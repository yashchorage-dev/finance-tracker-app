import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: "🏠" },
    { name: "Add Transaction", path: "/transactions", icon: "💸" },
    { name: "Reports", path: "/reports", icon: "📊" },
    { name: "Settings", path: "/settings", icon: "⚙️" },
  ];

  return (
    <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      {/* Sidebar Header */}
      <div className="sidebar-header">
        <button
          className="toggle-btn"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? "➡️" : "⬅️"}
        </button>

        {!isCollapsed && <h2 className="sidebar-title">💰 Finance Manager</h2>}
      </div>

      {/* Navigation */}
      <nav className="sidebar-menu">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`sidebar-link ${
              location.pathname === item.path ? "active" : ""
            }`}
          >
            <span className="icon">{item.icon}</span>
            {!isCollapsed && <span className="name">{item.name}</span>}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
