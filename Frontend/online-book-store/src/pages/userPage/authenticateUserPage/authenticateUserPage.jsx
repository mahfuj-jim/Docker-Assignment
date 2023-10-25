/* eslint-disable no-dupe-else-if */
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import HeaderFooterLayout from "../../../layout/headerFooter/headerFooterLayout";

const AuthenticateUser = () => {
  const user = useSelector((state) => state.user.userData);

  if (user.role == 1) {
    return <Navigate to="/admin"></Navigate>;
  } else {
    return (
      <HeaderFooterLayout>
        <Outlet />
      </HeaderFooterLayout>
    );
  }
};

export default AuthenticateUser;
