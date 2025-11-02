import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * ProtectedAuthRoute prevents logged-in users from accessing
 * the login or register pages.
 */
const ProtectedAuthRoute = () => {
  const { user } = useAuth();

  if (user) {
    // Redirect logged-in users to home (or rooms)
    return <Navigate to="/" replace />;
  }

  // Render login/register routes
  return <Outlet />;
};

export default ProtectedAuthRoute;
