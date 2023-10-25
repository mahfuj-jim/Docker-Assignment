import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthenticateAdmin = () => {
  const user = useSelector((state) => state.user.userData);

  if (!user || user.role != 1) {
    return <Navigate to="/" />;
  } else {
    return <Outlet />;
  }
};

export default AuthenticateAdmin;
