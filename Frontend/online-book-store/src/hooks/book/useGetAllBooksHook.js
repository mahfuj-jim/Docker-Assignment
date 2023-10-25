/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../../utils/axiosInstance";

const useGetAllBooksHook = (pageNumber = 1, admin="") => {
  const searchData = useSelector((state) => state.search.searchData);
  const [loader, setLoader] = useState(true);
  const [booksData, setBooksData] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const apiUrl = `/book/all${admin}?page=${pageNumber}&limit=20&searchKey=${searchData.search}&sortProperty=${searchData.sortProperty}&sortOrder=${searchData.sortOrder}&genreFilter=${searchData.genreFilter}`;

  useEffect(() => {
    const timeOutFunc = setTimeout(() => {
      getAllBooks();
    }, 800);

    return () => clearTimeout(timeOutFunc);
  }, [pageNumber, searchData]);

  const getAllBooks = async () => {
    try {
      setLoader(true);

      const response = await axiosInstance.get(apiUrl);
      setBooksData(response.data.data.books);
      setTotalPage(response.data.data.totalPages);

      setLoader(false);
      return response.data;
    } catch (error) {
      setLoader(false);
      console.error("Error fetching data:", error);
    }
  };

  return { loader, booksData, totalPage };
};

export default useGetAllBooksHook;
