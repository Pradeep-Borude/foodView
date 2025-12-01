// import { useCookies } from "react-cookie";
// import { Navigate } from "react-router-dom";

// export default function UserProtectedRoute({ children }) {
//   const [cookies] = useCookies(["userToken"]);

//   if (!cookies.userToken) {
//     return <Navigate to="/user/login" replace />;
//   }

//   return children;
// }

// src/middleware/UserProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function UserProtectedRoute({ children }) {
  const [status, setStatus] = useState("loading"); // 'loading' | 'ok' | 'unauthorized'

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get("http://localhost:3000/api/auth/user/me", {
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
    return <Navigate to="/user/login" replace />;
  }

  return children;
}
