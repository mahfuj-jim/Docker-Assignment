/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import { saveUser } from "../../../redux/slice/userSlice";
import localStorage from "../../../utils/localStorage";
import useAuthHook from "../../../hooks/auth/useAuthHook.js";
import Input from "../../../components/elements/input/input.jsx";
import Button from "../../../components/elements/button/button.jsx";
import Loader from "../../../components/loader/loader";
import { showSuccessNotification } from "../../../components/elements/tostify/tostify";
import "./loginPage.style.scss";

const LoginPage = () => {
  const [loader, setLoader] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState(null);
  const { saveToLocalStorage } = localStorage();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { login } = useAuthHook();

  const { control, handleSubmit, getValues } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async () => {
    setLoader(true);

    const email = getValues("email");
    const password = getValues("password");
    console.log(email, password);
    const result = await login(email, password);
    if (result.success) {
      const userInfo = {
        token: result.data.token,
        role: result.data.role,
        id: result.data.user._id,
        email: result.data.user.email,
      };

      setRole(result.data.role);
      saveToLocalStorage(
        userInfo.id,
        userInfo.email,
        userInfo.role,
        userInfo.token
      );
      dispatch(saveUser(userInfo));

      setLoader(false);
      showSuccessNotification("Login Successful", navigateNextPage);
    } else {
      setLoader(false);
    }
  };

  const navigateNextPage = () => {
    if (role === 2) {
      navigate("/");
    } else {
      navigate("/admin/books");
    }
  };

  const navigateForgetPasswordPage = () => {
    navigate("/forget-password");
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const navigateToSignup = () => {
    navigate("/signup");
  };

  if(loader){
    return <Loader></Loader>
  }

  return (
    <div className="login-page-container">
      <div className="login-page-card">
        <h3 className="login-page-title">Login</h3>
        <p className="login-page-subtitle">
          Your Passport to Literary Adventures
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="login-page-input-field">
            <p className="login-page-input-field-title">Email</p>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  field={field}
                  type="email"
                  placeholder="Enter your email"
                  className="auth-input"
                  onChange={()=>{}}
                />
              )}
            />
          </div>
          <div className="login-page-input-field">
            <p className="login-page-input-field-title">Password</p>
            <div className="login-page-input-password">
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <Input
                    field={field}
                    type={showPassword ? "text" : "text"}
                    placeholder="Enter your password"
                    className="auth-input"
                  ></Input>
                )}
              />
            </div>
          </div>
          <p className="forget-password" onClick={navigateForgetPasswordPage}>Forget Password?</p>
          <Button
            title="Login"
            // type="submit"
            className="auth-button"
            onClick={() => {}}
          />
        </form>
        <div className="login-page-create-account">
          <p className="login-page-signup-text">Don't have an account?</p>
          <Button
            title="Signup"
            onClick={navigateToSignup}
            className="auth-button-create-account"
          />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginPage;
