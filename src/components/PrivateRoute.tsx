import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { getUser } from "../services/api";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = Cookies.get("token");
        if (!token) {
          setIsAuthenticated(false);
          return;
        }
        await getUser();
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
        Cookies.remove("token");
      }
    };
    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return <div>Yükleniyor...</div>;
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
