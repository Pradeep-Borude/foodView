import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function PublicOnlyRoute({ children }) {
  const [redirect, setRedirect] = useState(null);

  useEffect(() => {
    const check = () => {
      const hasUser = document.cookie.includes("userToken=");
      const hasPartner = document.cookie.includes("foodPartnerToken=");

      if (hasPartner) {
        setRedirect("/food-partner/dashboard");
      } else if (hasUser) {
        setRedirect("/user");
      } else {
        setRedirect(null); 
      }
    };

    check();
  }, []);

  if (redirect) {
    return <Navigate to={redirect} replace />;
  }

  return children;
}
