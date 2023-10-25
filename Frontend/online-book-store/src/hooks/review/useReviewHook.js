import axiosInstance from "../../utils/axiosInstance";
import { useSelector } from "react-redux";

const useReviewHook = () => {
  const userData = useSelector((state) => state.user.userData);

  const getBookReview = async (bookId) => {
    try {
      const apiUrl = `/review/book/${bookId}`;
      const response = await axiosInstance.get(apiUrl, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (err) {
      console.log(err);
    }
  };

  const submitReview = (newReviewData) => {
    return axiosInstance
      .post("/review/add", newReviewData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userData.token}`,
        },
      })
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error submitting review:", error);
        throw error;
      });
  };

  const updateReview = (updatedReviewData) => {
    console.log("Update Review: ", updatedReviewData);
    return axiosInstance
      .put("/review/update", updatedReviewData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userData.token}`,
        },
      })
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error updating review:", error);
        throw error;
      });
  };

  const deleteReview = (reviewId) => {
    const requestBody = {
      reviewId: reviewId,
    };

    return axiosInstance
      .delete(`/review/delete/`, {
        headers: {
          "Content-Type": "Application/json",
          Authorization: `Bearer ${userData.token}`,
        },
        data: requestBody,
      })
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error deleting review:", error);
        throw error;
      });
  };

  return { getBookReview, submitReview, updateReview, deleteReview };
};

export default useReviewHook;
