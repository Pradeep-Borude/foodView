// src/middleware/PublicOnlyRoute.jsx
import { Navigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export default function PublicOnlyRoute({ children }) {
  const [status, setStatus] = useState("checking"); // 'checking' | 'guest' | 'auth'
  const [redirectTo, setRedirectTo] = useState("/");

  useEffect(() => {
    const check = async () => {
      try {
        const partnerRes = await axios.get(
          "http://localhost:3000/api/auth/food-partner/me",
          { withCredentials: true }
        );
        if (partnerRes.data?.success) {
          setRedirectTo("/food-partner/dashboard");
          setStatus("auth");
          return;
        }
      } catch {}

      try {
        const userRes = await axios.get(
          "http://localhost:3000/api/auth/user/me",
          { withCredentials: true }
        );
        if (userRes.data?.success) {
          setRedirectTo("/user");
          setStatus("auth");
          return;
        }
      } catch {}

      setStatus("guest");
    };

    check();
  }, []);

  if (status === "checking") return null; 

  if (status === "auth") {
    return <Navigate to={redirectTo} replace />;
  }

  return children; 
}
