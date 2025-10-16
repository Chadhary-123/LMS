import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";  // 🆕 Change to Redux
import { selectIsAuthenticated, selectUser } from "../redux/slices/authSlice";  // 🆕 Import selectors

export default function ProtectedRoute({ children, requiredRole }) {
  const isAuthenticated = useSelector(selectIsAuthenticated);  // 🆕 Use Redux
  const user = useSelector(selectUser);  // 🆕 Use Redux
  
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  
  if (requiredRole && user?.role !== requiredRole) {
    if (user?.role === "Instructor") {
      return <Navigate to="/dashboard/instructor-home" replace />;
    } else {
      return <Navigate to="/dashboard/home" replace />;
    }
  }
  
  return children;
}