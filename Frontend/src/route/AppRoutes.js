import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Auth
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ProtectedRoute from "../components/ProtectedRoute";
import Dashboard from "../pages/Dashboard";

// Student pages
import StudentHome from "../pages/student/StudentHome";
import MyLearning from "../pages/student/MyLearning";
import CourseDetail from "../pages/student/CourseDetail";

// Instructor pages (use lowercase 'instructor' folder)
import InstructorDashboard from "../pages/Instructor/InstructorDashboard";
import CreateCourse from "../pages/Instructor/CreateCourse";
import EditCourse from "../pages/Instructor/EditCourse";
import MyCourses from "../pages/Instructor/MyCourse";
// New imports for instructor profile/settings
import InstructorProfile from "../pages/Instructor/InstructorProfile";  // Create this file
import InstructorSettings from "../pages/Instructor/InstructorSettings"; // Create this file


export default function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected Dashboard */}
      <Route
        path="/dashboard/*"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      >
        {/* Student */}
        <Route path="home" element={<StudentHome />} />
        <Route path="my-learning" element={<MyLearning />} />
        <Route path="courses/:courseId" element={<CourseDetail />} />

        {/* Instructor (role-protected) */}
        <Route
          path="instructor-home"
          element={
            <ProtectedRoute requiredRole="Instructor">
              <InstructorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="instructor/create-course"
          element={
            <ProtectedRoute requiredRole="Instructor">
              <CreateCourse />
            </ProtectedRoute>
          }
        />
        <Route
          path="instructor/edit-course/:courseId"
          element={
            <ProtectedRoute requiredRole="Instructor">
              <EditCourse />
            </ProtectedRoute>
          }
        />
        <Route
          path="instructor/my-courses"
          element={
            <ProtectedRoute requiredRole="Instructor">
              <MyCourses />
            </ProtectedRoute>
          }
        />
        {/* New instructor profile routes */}
        <Route
          path="instructor/profile"
          element={
            <ProtectedRoute requiredRole="Instructor">
              <InstructorProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="instructor/settings"
          element={
            <ProtectedRoute requiredRole="Instructor">
              <InstructorSettings />
            </ProtectedRoute>
          }
        />

        {/* Fallback inside dashboard */}
        <Route path="*" element={<Navigate to="home" replace />} />
      </Route>

      {/* Root and unknown paths */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}