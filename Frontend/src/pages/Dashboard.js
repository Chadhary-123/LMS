import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser, selectIsAuthenticated } from "../redux/slices/authSlice";
import "../styles/Dashboard.css";

export default function Dashboard() {
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Redirect to appropriate dashboard based on role if at root dashboard path
  if (location.pathname === "/dashboard") {
    if (user?.role === "Instructor") {
      return <Navigate to="/dashboard/instructor-home" replace />;
    } else {
      return <Navigate to="/dashboard/home" replace />;
    }
  }

  return (
    <div className="dashboard-main">
      <div className="dashboard-content">
        <Outlet />
      </div>
    </div>
  );
}