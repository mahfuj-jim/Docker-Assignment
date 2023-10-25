/* eslint-disable react/prop-types */
// import React from 'react';
import { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEdit, faDeleteLeft } from "@fortawesome/free-solid-svg-icons";
import useGetAllAuthorsHook from "../../../hooks/author/useGetAllAuthorsHook";
import SideBar from "../../../components/sideBar/sideBar";
import "./authorListPage.style.scss";

const AuthorListPage = () => {
  const { authorData } = useGetAllAuthorsHook();

  return (
    <Fragment>
      <div className="sidebar-and-content-container">
        <SideBar></SideBar>
        <div className="book-table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>About</th>
                <th>Country</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {authorData.map((author, index) => (
                <tr key={index}>
                  <td>{author.name}</td>
                  <td className="author-about-column">{author.about}</td>
                  <td>{author.country}</td>
                  <td>
                    <FontAwesomeIcon className="view-icon" icon={faEye} />
                    <FontAwesomeIcon className="edit-icon" icon={faEdit} />
                    <FontAwesomeIcon
                      className="delete-icon"
                      icon={faDeleteLeft}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
};

export default AuthorListPage;
