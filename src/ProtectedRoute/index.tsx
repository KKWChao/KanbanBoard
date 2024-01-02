import { useAuth } from "@/context/authContext";
import React from "react";
import { Navigate, Route, RouteProps } from "react-router-dom";

type ProtectedRouteProps = {
  path: string;
  element: React.ReactNode;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  element,
  ...rest
}) => {
  const { token } = useAuth();

  return token ? (
    <Route {...rest} element={element} />
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoute;
