/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import { Fragment } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useAuthHook from "../../hooks/auth/useAuthHook";
import SideBar from "../../components/sideBar/sideBar";
import Button from "../../components/elements/button/button";
import Input from "../../components/elements/input/input";
import "./discountModifyPage.style.scss";

const DiscountModifyPage = ({ isUpdate }) => {
  const { control, handleSubmit } = useForm();
  const { adminSignup } = useAuthHook();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const result = await adminSignup(
      data.name,
      data.email,
      data.password,
      data.id,
      data.superAdmin == "1" ? true : false 
    );
    if(result.success){
      navigate('/admin/books');
    }
  };

  return (
    <Fragment>
      <div className="sidebar-and-content-container">
        <SideBar></SideBar>
        <div className="book-modify-page-container">
          <h3 className="book-modify-page-title">
            {isUpdate ? "Update Discount" : "Admin Signup"}
          </h3>
          <p className="book-modify-page-subtitle">
            Add new member to your team
          </p>
          <div className="book-modify-page-card">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="book-modify-page-input-field">
                <p className="book-modify-input-field-title">Email</p>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <Input
                      field={field}
                      type="text"
                      placeholder="Enter admin's email"
                      className="auth-input"
                    />
                  )}
                />
              </div>
              <div className="book-modify-page-input-field">
                <p className="book-modify-input-field-title">Name</p>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <Input
                      field={field}
                      type="text"
                      placeholder="Enter admin's name"
                      className="auth-input"
                    />
                  )}
                />
              </div>
              <div className="book-modify-page-input-field-row">
                {!isUpdate && (
                  <div className="book-modify-page-input-field">
                    <p className="book-modify-input-field-title">Admin Type</p>
                    <Controller
                      name="type"
                      control={control}
                      render={({ field }) => (
                        <Input
                          field={field}
                          type="text"
                          placeholder="Enter admin type"
                          className="auth-input-half"
                        />
                      )}
                    />
                  </div>
                )}
                <div className="book-modify-page-input-field">
                  <p className="book-modify-input-field-title">Secret Id</p>
                  <Controller
                    name="id"
                    control={control}
                    render={({ field }) => (
                      <Input
                        field={field}
                        type="text"
                        placeholder="Enter admin's id"
                        className={isUpdate ? "auth-input" : "auth-input-half"}
                      />
                    )}
                  />
                </div>
              </div>
              <div className="book-modify-page-input-field">
                <p className="book-modify-input-field-title">Password</p>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <Input
                      field={field}
                      type="password"
                      placeholder="Enter password"
                      className="auth-input"
                    />
                  )}
                />
              </div>
              <div className="book-modify-page-input-field">
                <p className="book-modify-input-field-title">
                  Confirm Password
                </p>
                <Controller
                  name="confirmPassword"
                  control={control}
                  render={({ field }) => (
                    <Input
                      field={field}
                      type="password"
                      placeholder="Confirm Password"
                      className="auth-input"
                    />
                  )}
                />
              </div>
              <Button
                title={isUpdate ? "Update Discount" : "Admin Signup"}
                type="submit"
                className="auth-button"
                onClick={() => {}}
              />
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default DiscountModifyPage;
