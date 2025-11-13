import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

function SidebarLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        background: "#f7f9fc",
      }}
    >
      {/* Sidebar */}
      <div
        style={{
          width: isCollapsed ? "70px" : "230px",
          background: "#fff",
          borderRight: "1px solid #e0e0e0",
          color: "#333",
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          overflowY: "auto",
          boxShadow: "2px 0 6px rgba(0,0,0,0.05)",
          zIndex: 10,
          transition: "width 0.3s ease",
        }}
      >
        <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      </div>

      {/* Main Content (Dashboard, Reports, etc.) */}
      <main
        style={{
          flex: 1,
          marginLeft: isCollapsed ? "70px" : "230px",
          background: "#f7f9fc",
          height: "100vh",
          overflowY: "auto",
          padding: 0, // ✅ remove outer padding
          boxSizing: "border-box",
          transition: "margin-left 0.3s ease",
        }}
      >
        <Outlet />
      </main>
    </div>
  );
}

export default SidebarLayout;
