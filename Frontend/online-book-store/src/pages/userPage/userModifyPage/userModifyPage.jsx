/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import useUserHook from "../../../hooks/user/useUserHook";
import SideBar from "../../../components/sideBar/sideBar";
import Button from "../../../components/elements/button/button";
import Input from "../../../components/elements/input/input";
import {
  showSuccessNotification,
  showErrorNotification,
} from "../../../components/elements/tostify/tostify";
import "./userModifyPage.style.scss";

const UserModifyPage = ({ isAdmin = true }) => {
  const { userId } = useParams();
  const [userData, setUserData] = useState({});
  const { getUserById, updateUser } = useUserHook();
  const navigate = useNavigate();

  useEffect(() => {
    getUserData();
  }, [userId]);

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      name: "",
      phoneNumber: "",
      district: "",
      area: "",
      houseNumber: "",
    },
  });

  const getUserData = async () => {
    const result = await getUserById(userId);
    if (result.success) {
      reset({
        name: result.data.name,
        phoneNumber: result.data.phoneNumber,
        district: result.data.address.district,
        area: result.data.address.area,
        houseNumber: result.data.address.houseNumber,
      });
      setUserData(result.data);
    }
  };

  const navigateHomePage = () => {
    navigate("/");
  };

  const onSubmit = async (data) => {
    console.log(data);
    const user = {
      userId: userId,
      name: data.name,
      phoneNumber: data.phoneNumber,
      address: {
        district: data.district,
        area: data.area,
        houseNumber: data.houseNumber,
      },
    };

    try {
      const result = await updateUser(user);
      if (result.success) {
        showSuccessNotification(
          "Profile Updated Successfully",
          navigateHomePage
        );
      } else {
        showErrorNotification("Failed to Update Profile");
      }
    } catch (err) {
      showErrorNotification("Failed to Update Profile");
    }
  };

  return (
    <Fragment>
      {!isAdmin && <br></br>}
      <div className="sidebar-and-content-container">
        {isAdmin && <SideBar></SideBar>}
        <div className="book-modify-page-container">
          <h3 className="book-modify-page-title">Update User Profile</h3>
          <p className="book-modify-page-subtitle">
            Modify User Information to Suit Your Needs
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
                      placeholder="Enter user's name"
                      className="auth-input"
                    />
                  )}
                />
              </div>
              <div className="book-modify-page-input-field">
                <p className="book-modify-input-field-title">Phone Number</p>
                <Controller
                  name="phoneNumber"
                  control={control}
                  render={({ field }) => (
                    <Input
                      field={field}
                      type="text"
                      placeholder="Enter user's phone number"
                      className="auth-input"
                    />
                  )}
                />
              </div>
              <div className="book-modify-page-input-field-row">
                <div className="book-modify-page-input-field">
                  <p className="book-modify-input-field-title">District</p>
                  <Controller
                    name="district"
                    control={control}
                    render={({ field }) => (
                      <Input
                        field={field}
                        type="text"
                        placeholder="Enter user's district"
                        className="auth-input-half"
                      />
                    )}
                  />
                </div>
                <div className="book-modify-page-input-field">
                  <p className="book-modify-input-field-title">House Number</p>
                  <Controller
                    name="houseNumber"
                    control={control}
                    render={({ field }) => (
                      <Input
                        field={field}
                        type="text"
                        placeholder="Enter user's house number"
                        className="auth-input-half"
                      />
                    )}
                  />
                </div>
              </div>
              <div className="book-modify-page-input-field">
                <p className="book-modify-input-field-title">Area</p>
                <Controller
                  name="area"
                  control={control}
                  render={({ field }) => (
                    <Input
                      field={field}
                      type="text"
                      placeholder="Enter user's area"
                      className="auth-input"
                    />
                  )}
                />
              </div>
              <Button
                title={"Update User Profile"}
                type="submit"
                className="auth-button"
                onClick={() => {}}
              />
            </form>
          </div>
        </div>
        <ToastContainer></ToastContainer>
      </div>
    </Fragment>
  );
};

export default UserModifyPage;
