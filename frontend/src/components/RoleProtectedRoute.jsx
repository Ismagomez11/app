import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function RoleProtectedRoute({ children, role }) {
  const { user, token, loading } = useAuth();

  if (loading) return null;

  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (!user) {
    return null;
  }

  if (role && user.role !== role) {
    return <Navigate to="/home" replace />;
  }

  return children;
}