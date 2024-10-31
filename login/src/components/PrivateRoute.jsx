import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { ContextUser } from "../context/UserContext";

const PrivateRoute = ({ children }) => {
  const { state } = useContext(ContextUser);

  if (!state.isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
