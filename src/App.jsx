import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import ProtectedRoute from "./components/ProtectedRoute";
import SidebarLayout from "./layouts/SidebarLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Auth Pages */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Pages */}
        <Route
          element={
            <ProtectedRoute>
              <SidebarLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} /> {/* ✅ Clean */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
