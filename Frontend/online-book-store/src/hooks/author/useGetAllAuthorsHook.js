/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";

const useGetAllAuthorsHook = (pageNumber = 1) => {
  const [authorData, setAuthorData] = useState([]);
  const apiUrl = `/author/all?page=${pageNumber}&limit=20`;

  useEffect(() => {
    const timeOutFunc = setTimeout(() => {
      getAllAuthors();
    }, 800);

    return () => clearTimeout(timeOutFunc);
  }, []);

  const getAllAuthors = async () => {
    try {
      const response = await axiosInstance.get(apiUrl);
      setAuthorData(response.data.data.authors);
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return { authorData };
};

export default useGetAllAuthorsHook;
