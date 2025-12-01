
// src/middleware/PartnerProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function PartnerProtectedRoute({ children }) {
  const [status, setStatus] = useState("loading"); // 'loading' | 'ok' | 'unauthorized'

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get("http://localhost:3000/api/auth/food-partner/me", {
          withCredentials: true,
        });
        setStatus("ok");
      } catch (err) {
        setStatus("unauthorized");
      }
    };

    checkAuth();
  }, []);

  if (status === "loading") {
    return null; // or a spinner
  }

  if (status === "unauthorized") {
    return <Navigate to="/food-partner/login" replace />;
  }

  return children;
}
