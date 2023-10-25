/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import { Fragment } from "react";
import { useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import SideBar from "../../../components/sideBar/sideBar";
import Button from "../../../components/elements/button/button";
import Input from "../../../components/elements/input/input";
import "./authorModifyPage.style.scss";

const AuthorModifyPage = ({ isUpdate }) => {
  const { bookId } = useParams();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      about: "",
      country: "",
    },
  });

  const onSubmit = async (data) => {
    console.log(data, bookId);
  };

  return (
    <Fragment>
      <div className="sidebar-and-content-container">
        <SideBar></SideBar>
        <div className="book-modify-page-container">
          <h3 className="book-modify-page-title">
            {isUpdate ? "Update Author" : "Add Author"}
          </h3>
          <p className="book-modify-page-subtitle">
            Get to Know the Authors Shaping the World of Literature
          </p>
          <div className="book-modify-page-card">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="book-modify-page-input-field">
                <p className="book-modify-input-field-title">Name</p>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <Input
                      field={field}
                      type="text"
                      placeholder="Enter author's name"
                      className="auth-input"
                    />
                  )}
                />
              </div>
              <div className="book-modify-page-input-field">
                <p className="book-modify-input-field-title">About</p>
                <Controller
                  name="about"
                  control={control}
                  render={({ field }) => (
                    <Input
                      field={field}
                      type="text"
                      placeholder="Enter author's details"
                      className="auth-input"
                    />
                  )}
                />
              </div>
              <div className="book-modify-page-input-field">
                <p className="book-modify-input-field-title">Country</p>
                <Controller
                  name="country"
                  control={control}
                  render={({ field }) => (
                    <Input
                      field={field}
                      type="text"
                      placeholder="Enter author's country"
                      className="auth-input"
                    />
                  )}
                />
              </div>
              <Button
                title={isUpdate ? "Update Author" : "Add Author"}
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

export default AuthorModifyPage;
