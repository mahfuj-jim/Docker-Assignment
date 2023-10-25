/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
// import React from 'react';
import { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faTurnUp } from "@fortawesome/free-solid-svg-icons";
import {
  updateSearchItem,
  updateGenreFilter,
  updateSortProperty,
  updateSortOrder,
} from "../../../redux/slice/searchSlice";
import useBookHook from "../../../hooks/book/useBookHook";
import useGetAllBooksHook from "../../../hooks/book/useGetAllBooksHook";
import SideBar from "../../../components/sideBar/sideBar";
import Loader from "../../../components/loader/loader";
import "./bookListPage.style.scss";

const BookListPage = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedSortOption, setSelectedSortOption] = useState("");
  const { loader, booksData, totalPage } = useGetAllBooksHook(
    pageNumber,
    "/admin"
  );
  const { updateBookDisable } = useBookHook();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    updateSortFiltering();
  }, [selectedGenre, selectedSortOption]);

  const editBookPage = (book) => {
    navigate(`/admin/update-book/${book._id}`);
  };

  const handleInputChange = (value) => {
    dispatch(updateSearchItem(value));
  };

  const updateSortFiltering = () => {
    const [sortField, sortOrder] = selectedSortOption.split("-");

    dispatch(updateGenreFilter(selectedGenre));
    dispatch(updateSortProperty(sortField));
    dispatch(updateSortOrder(sortOrder));
  };

  const disableBook = async (bookId, disable) => {
    const disableData = {
      bookId: bookId,
      disable: !disable,
    };

    const result = await updateBookDisable(disableData);
    if (result.success) {
      window.location.reload();
    }
  };

  const pageNumbers = [];

  for (let i = 1; i <= totalPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <Fragment>
      <div className="sidebar-and-content-container">
        <SideBar></SideBar>
        <div className="book-table">
          <h1>Book List</h1>
          <br></br>
          <div className="booklist-input">
            <input
              type={"text"}
              placeholder={"Search Products by Title or Tag"}
              className={"search-input"}
              onChange={(e) => handleInputChange(e.target.value)}
            ></input>
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
            >
              <option value="">All Genres</option>
              <option value="Fiction">Fiction</option>
              <option value="Drama">Drama</option>
              <option value="Novel">Novel</option>
              <option value="Political">Political</option>
              <option value="Thriller">Thriller</option>
              <option value="Psychological">Psychological</option>
              <option value="Short Stories">Short Stories</option>
            </select>
            <select
              value={selectedSortOption}
              onChange={(e) => setSelectedSortOption(e.target.value)}
            >
              <option value="">Sort By</option>
              <option value="">None</option>
              <option value="price-asc">Price (Low to High)</option>
              <option value="price-desc">Price (High to Low)</option>
              <option value="stock-asc">Stock (Low to High)</option>
              <option value="stock-desc">Stock (High to Low)</option>
              <option value="rating-asc">Rating (Low to High)</option>
              <option value="rating-desc">Rating (High to Low)</option>
              <option value="totalSell-asc">Total Sell (Low to High)</option>
              <option value="totalSell-desc">Total Sell (High to Low)</option>
            </select>
          </div>
          <br></br>
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Author</th>
                <th>Rating</th>
                <th>Sell</th>
                <th>Price</th>
                <th>Disable</th>
                <th>Actions</th>
              </tr>
            </thead>
            {loader ? (
              <Loader></Loader>
            ) : (
              <tbody>
                {booksData.map((book, index) => (
                  <tr key={index}>
                    <td>
                      <img
                        src={
                          book.image.startsWith("server/images/")
                            ? "http://localhost:8000/" +
                              book.image.replace(/^server\//, "")
                            : book.image
                        }
                        alt={book.title}
                      />
                    </td>
                    <td>{book.title}</td>
                    <td>{book.author.name}</td>
                    <td>{book.rating}</td>
                    <td>{book.totalSell}</td>
                    <td>{book.price}</td>
                    <td>{book.disable.toString()}</td>
                    <td>
                      {/* <FontAwesomeIcon className="view-icon" icon={faEye} /> */}
                      <FontAwesomeIcon
                        className="edit-icon"
                        icon={faEdit}
                        onClick={() => editBookPage(book)}
                      />
                      <FontAwesomeIcon
                        className="delete-icon"
                        icon={book.disable ? faTurnUp : faTrash}
                        onClick={() => disableBook(book._id, book.disable)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
          <br></br>
          <div className="page-btn">
            {pageNumbers.map((page) => (
              <span key={page} onClick={() => setPageNumber(page)}>
                {page}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default BookListPage;
