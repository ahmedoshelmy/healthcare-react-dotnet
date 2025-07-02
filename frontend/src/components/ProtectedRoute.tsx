import React, { useEffect, useState, type JSX } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

interface Props {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const [authorized, setAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("http://localhost:5181/api/users/me", {
          withCredentials: true,
        });
        if (res.status === 200) {
          setAuthorized(true);
        } else {
          setAuthorized(false);
        }
      } catch {
        setAuthorized(false);
      }
    };

    checkAuth();
  }, []);

  if (authorized === null) return null; // loading or spinner could go here
  return authorized ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
