import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

const LoginPage = lazy(() => import("./pages/LoginPage"));
const SignupPage = lazy(() => import("./pages/SignupPage"));
const HomePage = lazy(() => import("./pages/HomePage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const DetailedProfilePage = lazy(() => import("./pages/DetailedProfilePage"));
const RequestsPage = lazy(() => import("./pages/RequestsPage"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));

const PrivateRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="p-4">Loading...</div>;
  return user ? children : <Navigate to="/login" replace />;
};

const AdminRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { user, loading, isAdmin } = useAuth();
  if (loading) return <div className="p-4">Loading...</div>;
  return user && isAdmin ? children : <Navigate to="/" replace />;
};

const Router: React.FC = () => (
  <Suspense fallback={<div className="p-4">Loading...</div>}>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/" element={<HomePage />} />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <ProfilePage />
          </PrivateRoute>
        }
      />
      <Route path="/users/:id" element={<DetailedProfilePage />} />
      <Route
        path="/requests"
        element={
          <PrivateRoute>
            <RequestsPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </Suspense>
);

export default Router;
