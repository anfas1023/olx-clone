import React from "react";
import { userAuth } from "../Context/ProductContext";
import { Navigate } from "react-router-dom";
type Props = {
  children: React.ReactNode;
};
 export const ProtectedRoute = ({ children }: Props) => {
  const auth = userAuth();
  if (!auth) {
    throw new Error("undefined");
  }

  const { user } = auth;

  if (!user) {
    return <Navigate to="/" />;
  }

  return children;
};

// export default ProtectedRoute;