/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import Input from "../../../components/elements/input/input.jsx";
import Button from "../../../components/elements/button/button.jsx";
import Loader from "../../../components/loader/loader";
import "./forgetPasswordPage.style.scss";

const ForgetPasswordPage = () => {
  const [loader, setLoader] = useState(false);

  const { control, handleSubmit, getValues } = useForm({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async () => {
    setLoader(true);

    const email = getValues("email");

    try {
      const response = await fetch(
        "http://localhost:8000/api/auth/forgetpassword/email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (response.ok) {
        setLoader(false);
        alert("Check your email to reset password");
      } else {
        setLoader(false);
      }
    } catch (error) {
      setLoader(false);
    }
  };

  const navigateNextPage = () => {};

  if (loader) {
    return <Loader></Loader>;
  }

  return (
    <div className="login-page-container">
      <div className="login-page-card">
        <h3 className="login-page-title">Forget Password</h3>
        <p className="login-page-subtitle"></p>
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
                  onChange={() => {}}
                />
              )}
            />
          </div>
          <Button
            title="Submit"
            // type="submit"
            className="auth-button"
            onClick={() => {}}
          />
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ForgetPasswordPage;
