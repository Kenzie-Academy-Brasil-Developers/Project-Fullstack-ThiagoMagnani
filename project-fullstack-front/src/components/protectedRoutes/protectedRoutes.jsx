import { useUserContext } from "../providers/userContext";
import { Outlet, Navigate } from "react-router-dom";

export const ProtectedRoutes = () => {
  const { user, loading } = useUserContext();
  if (loading) {
    return null;
  }
  return user ? <Outlet /> : <Navigate to="/" />;
};
