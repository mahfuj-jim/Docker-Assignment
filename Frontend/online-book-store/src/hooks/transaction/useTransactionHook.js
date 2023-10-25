import { useSelector } from "react-redux";
import axiosInstance from "../../utils/axiosInstance";

const useTransactionHook = () => {
  const userData = useSelector((state) => state.user.userData);

  const getOneUsersTransactions = async () => {
    try {
      const apiUrl = `/transaction/user/${userData.id}`;
      const response = await axiosInstance.get(apiUrl, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userData.token}`,
        },
      });
      return response.data.data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  const getAllUsersTransactions = async () => {
    try {
      const apiUrl = `/transaction/all`;
      const response = await axiosInstance.get(apiUrl, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userData.token}`,
        },
      });
      return response.data.data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const createTransaction = async () => {
    try {
      const apiUrl = "/transaction/create";
      const response = await axiosInstance.post(apiUrl, {}, {
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

  return { getOneUsersTransactions, getAllUsersTransactions, createTransaction };
};

export default useTransactionHook;
