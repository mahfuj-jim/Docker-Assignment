import { useSelector } from "react-redux";
import axiosInstance from "../../utils/axiosInstance";

const useCartHook = () => {
  const userData = useSelector((state) => state.user.userData);

  const getUserCart = async () => {
    try {
      const apiUrl = `/cart/view/${userData.id}`;
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

  const addBookToCart = async (cartData) => {
    try {
      const apiUrl = "/cart/add";
      const response = await axiosInstance.patch(apiUrl, cartData, {
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

  const removeBookFromCart = async (cartData) => {
    try {
      const apiUrl = "/cart/remove";
      const response = await axiosInstance.patch(apiUrl, cartData, {
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

  return { getUserCart, addBookToCart, removeBookFromCart };
};

export default useCartHook;
