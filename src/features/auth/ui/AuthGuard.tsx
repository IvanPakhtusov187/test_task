import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { useAppSelector } from "../../../app/storeHooks";

interface AuthGuardProps {
  children: ReactNode;
}

export const AuthGuard = ({ children }: AuthGuardProps) => {
  const token = useAppSelector((state) => state.auth.token);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
