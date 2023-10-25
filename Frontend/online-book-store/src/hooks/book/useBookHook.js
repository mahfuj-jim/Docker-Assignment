/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from "react-redux";
import axiosInstance from "../../utils/axiosInstance";

const useBookHook = () => {
  const userData = useSelector((state) => state.user.userData);

  const getBookById = async (bookId) => {
    const apiUrl = `/book/${bookId}`;
    try {
      const response = await axiosInstance.get(apiUrl, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const addBook = async (bookData) => {
    const apiUrl = "/book/add";
    try {
      const response = await axiosInstance.post(apiUrl, bookData, {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const updateBook = async (bookData) => {
    const apiUrl = "/book/edit";
    try {
      const response = await axiosInstance.put(apiUrl, bookData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userData.token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const updateBookDisable = async (disableData) => {
    const apiUrl = "/book/disable";
    try {
      const response = await axiosInstance.patch(apiUrl, disableData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userData.token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return { getBookById, addBook, updateBook, updateBookDisable };
};

export default useBookHook;
