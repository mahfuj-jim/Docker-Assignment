/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from "react-redux";
import axiosInstance from "../../utils/axiosInstance";

const useUserHook = () => {
  const userData = useSelector((state) => state.user.userData);

  const getUserById = async (userId) => {
    const apiUrl = `/user/${userId}`;
    try {
      const response = await axiosInstance.get(apiUrl, {
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

  const updateUser = async (updateData) => {
    const apiUrl = "/user/edit";

    try {
      const response = await axiosInstance.put(apiUrl, updateData, {
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

  const updateUserDisable = async (disableData) => {
    const apiUrl = "/user/disable";
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

  const updateUserBalance = async (amount) => {
    const apiUrl = "/user/balance";
    try {
      const balanceData = {
        userId: userData.id,
        amount: amount,
      };
      const response = await axiosInstance.patch(apiUrl, balanceData, {
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

  return { getUserById, updateUser, updateUserDisable, updateUserBalance };
};

export default useUserHook;
