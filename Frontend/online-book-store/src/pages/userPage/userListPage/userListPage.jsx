/* eslint-disable react/prop-types */
// import React from 'react';
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faTurnUp } from "@fortawesome/free-solid-svg-icons";
import useGetAllUsersHook from "../../../hooks/user/useGetAllUsersHook";
import useUserHook from "../../../hooks/user/useUserHook";
import SideBar from "../../../components/sideBar/sideBar";
import Loader from "../../../components/loader/loader";
import "./userListPage.style.scss";

const UserListPage = () => {
  const { userData, loader } = useGetAllUsersHook();
  const { updateUserDisable } = useUserHook();
  const navigate = useNavigate();

  const editUserPage = (user) => {
    navigate(`/admin/update-user/${user._id}`);
  };

  const disableUser = async (userId, disable) => {
    const disableData = {
      userId: userId,
      disable: !disable,
    };

    const result = await updateUserDisable(disableData);
    if (result.success) {
      window.location.reload();
    }
  };

  return (
    <Fragment>
      <div className="sidebar-and-content-container">
        <SideBar></SideBar>
        <div className="book-table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Blance</th>
                <th>Disable</th>
                <th>Actions</th>
              </tr>
            </thead>
            {loader ? (
              <Loader></Loader>
            ) : (
              <tbody>
                {userData.map((user, index) => (
                  <tr key={index}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.balance}</td>
                    <td>{user.disable.toString()}</td>
                    <td>
                      <FontAwesomeIcon
                        className="edit-icon"
                        icon={faEdit}
                        onClick={() => editUserPage(user)}
                      />
                      <FontAwesomeIcon
                        className="delete-icon"
                        icon={user.disable ? faTurnUp : faTrash}
                        onClick={() => disableUser(user._id, user.disable)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
      </div>
    </Fragment>
  );
};

export default UserListPage;
