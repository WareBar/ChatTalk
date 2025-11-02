import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * PrivateRoute ensures only authenticated users can access
 * the routes wrapped inside it.
 */
const PrivateRoute = () => {
  const { user } = useAuth();

  if (!user) {
    // Redirect to login if not logged in
    return <Navigate to="/login" replace />;
  }

  // Render child routes
  return <Outlet />;
};

export default PrivateRoute;
