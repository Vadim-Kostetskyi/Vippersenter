import { JSX, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);

  useEffect(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (!token) {
      setIsAuth(false);
      return;
    }
    setIsAuth(true);
  }, []);

  if (isAuth === null) return <div>...</div>;
  if (!isAuth) return <Navigate to="/login" replace />;

  return children;
};

export default PrivateRoute;
