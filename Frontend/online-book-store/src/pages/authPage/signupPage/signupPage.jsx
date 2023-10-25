/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import { saveUser } from "../../../redux/slice/userSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import localStorage from "../../../utils/localStorage";
import { showSuccessNotification } from "../../../components/elements/tostify/tostify";
import useAuthHook from "../../../hooks/auth/useAuthHook";
import Input from "../../../components/elements/input/input.jsx";
import Button from "../../../components/elements/button/button.jsx";
import "./signupPage.style.scss";
import Loader from "../../../components/loader/loader";

const SignupPage = () => {
  const [loader, setLoader] = useState(false);
  const { control, handleSubmit, getValues } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState(null);
  const { saveToLocalStorage } = localStorage();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { signup } = useAuthHook();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async () => {
    setLoader(true);

    const name = getValues("name");
    const email = getValues("email");
    const password = getValues("password");
    setRole(2);
    const result = await signup(name, email, password);
    if (result.success) {
      const userInfo = {
        token: result.data.accessToken,
        role: result.data.role,
        id: result.data.data._id,
        email: result.data.data.email,
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
      showSuccessNotification("Signup Successful", navigateNextPage);
    } else {
      setLoader(true);
      console.log("Not");
    }
  };

  const navigateNextPage = () => {
    if (role === 2) {
      navigate("/");
    } else {
      navigate("/admin");
    }
  };

  const navigateToLogin = () => {
    navigate("/login");
  };

  if(loader){
    return <Loader></Loader>
  }

  return (
    <div className="signup-page-container">
      <div className="signup-page-card">
        <h3 className="signup-page-title">Signup</h3>
        <p className="signup-page-subtitle">
          Sign Up for Exclusive Reading Benefits
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="signup-page-input-field">
            <p className="signup-page-input-field-title">Email</p>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  field={field}
                  type="email"
                  placeholder="Enter your email"
                  className="auth-input"
                />
              )}
            />
          </div>
          <div className="signup-page-input-field">
            <p className="signup-page-input-field-title">Name</p>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input
                  field={field}
                  type="text"
                  placeholder="Enter your name"
                  className="auth-input"
                />
              )}
            />
          </div>
          <div className="signup-page-input-field">
            <p className="signup-page-input-field-title">Password</p>
            <div className="signup-page-input-password">
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <Input
                    field={field}
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="auth-input"
                  />
                )}
              />
            </div>
          </div>
          <div className="signup-page-input-field">
            <p className="signup-page-input-field-title">Confirm Password</p>
            <div className="signup-page-input-password">
              <Controller
                name="confirmPassword"
                control={control}
                render={({ field }) => (
                  <Input
                    field={field}
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="auth-input"
                  />
                )}
              />
            </div>
          </div>
          <Button
            title="Signup"
            type="submit"
            className="auth-button"
            onClick={() => {}}
          />
        </form>
        <div className="signup-page-login-account">
          <p className="signup-page-login-text">Already have an account?</p>
          <Button
            title="Login"
            onClick={navigateToLogin}
            className="auth-button-create-account"
          />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignupPage;
