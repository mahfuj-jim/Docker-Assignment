/* eslint-disable no-dupe-else-if */
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthenticateUserLogin = () => {
  const user = useSelector((state) => state.user.userData);

  if (!user || user.role != 2) {
    return <Navigate to="/"></Navigate>;
  } else {
    return (
        <Outlet />
    );
  }
};

export default AuthenticateUserLogin;
