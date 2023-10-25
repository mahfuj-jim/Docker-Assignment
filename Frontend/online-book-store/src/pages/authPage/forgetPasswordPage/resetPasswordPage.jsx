/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import { saveUser } from "../../../redux/slice/userSlice";
import localStorage from "../../../utils/localStorage";
import Input from "../../../components/elements/input/input.jsx";
import Button from "../../../components/elements/button/button.jsx";
import Loader from "../../../components/loader/loader";
import { showSuccessNotification } from "../../../components/elements/tostify/tostify";
import "./forgetPasswordPage.style.scss";
import axiosInstance from "../../../utils/axiosInstance";

const ResetPasswordPage = () => {
  const { token, userId } = useParams();
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    checkValidity();
  }, []);

  const {
    formState: { errors },
    control,
    handleSubmit,
    watch,
  } = useForm({
    defaultValues: {},
  });

  const checkValidity = async () => {
    try {
      const response = await axiosInstance.get(
        `/auth/forgetpassword/validate?token=${token}&userId=${userId}`
      );

      console.log(response);

      if (response.data.success) {
        setError(null);
        setLoader(false);
      } else {
        setError("Request Not Found");
        setLoader(false);
      }
    } catch (err) {
      setError("Request Not Found");
      setLoader(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      const resetPasswordData = {
        token: token,
        userId: userId,
        newPassword: data.password,
        confirmPassword: data.confrimPassword,
      };

      const response = await axiosInstance.post(
        `/auth/forgetpassword/reset`,
        resetPasswordData
      );
      console.log(response);

      if (response.data.success) {
        navigate("/login");
      } else {
        //
      }
    } catch (err) {
      //
    }
  };

  const navigateNextPage = () => {};

  if (loader) {
    return <Loader></Loader>;
  }

  console.log(error);

  return (
    <div className="login-page-container">
      {error != null ? (
        <h1>{error}</h1>
      ) : (
        <div className="login-page-card">
          <h3 className="login-page-title">Reset Password</h3>
          <p className="login-page-subtitle"></p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="login-page-input-field">
              <p className="login-page-input-field-title">Password</p>
              <Controller
                name="password"
                control={control}
                rules={{ required: true, minLength: 8 }}
                render={({ field }) => (
                  <Input
                    field={field}
                    type="text"
                    placeholder="Enter your password"
                    className="auth-input"
                    onChange={() => {}}
                  />
                )}
              />
              {errors.password && (
                <p className="error-message">
                  Password must be at least 8 characters.
                </p>
              )}
            </div>
            <div className="login-page-input-field">
              <p className="login-page-input-field-title">Confirm Password</p>
              <Controller
                name="confrimPassword"
                control={control}
                rules={{
                  required: true,
                  validate: (value) => {
                    if (value != watch("password"))
                      return "Password and confirm password should be same";
                  },
                }}
                render={({ field }) => (
                  <Input
                    field={field}
                    type="text"
                    placeholder="Enter your password"
                    className="auth-input"
                    onChange={() => {}}
                  />
                )}
              />
              {errors.confrimPassword && (
                <p className="error-message">
                  Password and confirm password should be same
                </p>
              )}
            </div>
            {passwordError && (
                <p className="error-message">
                  Failed to reset password
                </p>
              )}
            <Button
              title="Submit"
              // type="submit"
              className="auth-button"
              onClick={() => {}}
            />
          </form>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default ResetPasswordPage;
