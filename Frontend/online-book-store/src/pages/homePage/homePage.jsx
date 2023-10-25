/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  updateGenreFilter,
  updateSortProperty,
  updateSortOrder,
} from "../../redux/slice/searchSlice";
import Loader from "../../components/loader/loader";
import BookCard from "../../components/book/bookCard/bookCard";
import useGetAllBooksHook from "../../hooks/book/useGetAllBooksHook";
import "./homePage.style.scss";

const HomePage = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedSortOption, setSelectedSortOption] = useState("");
  const { loader, booksData, totalPage } = useGetAllBooksHook(pageNumber);
  const dispatch = useDispatch();

  useEffect(() => {
    updateSortFiltering();
  }, [selectedGenre, selectedSortOption]);

  const updateSortFiltering = () => {
    const [sortField, sortOrder] = selectedSortOption.split('-');

    dispatch(updateGenreFilter(selectedGenre));
    dispatch(updateSortProperty(sortField));
    dispatch(updateSortOrder(sortOrder))
  }

  const pageNumbers = [];

  for (let i = 1; i <= totalPage; i++) {
    pageNumbers.push(i);
  }

  if (loader) {
    return <Loader></Loader>;
  }

  return (
    <div className="home-page">
      <div className="filter-and-sort">
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
      <div className="home-page-container">
        <div>
          <div className="home-page-catagory">
            {booksData.map((book, index) => (
              <BookCard key={index} book={book} />
            ))}
          </div>
        </div>
        <div className="page-btn">
          {pageNumbers.map((page) => (
            <span key={page} onClick={() => setPageNumber(page)}>
              {page}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
