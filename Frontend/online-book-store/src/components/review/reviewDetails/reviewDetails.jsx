import { useState, useEffect } from "react";
import Rating from "react-rating-stars-component";
import { useForm, Controller } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import useReviewHook from "../../../hooks/review/useReviewHook";
import Loader from "../../loader/loader";
import Input from "../../elements/input/input";
import Button from "../../elements/button/button";
import "./reviewDetails.style.scss";

const ReviewDetails = () => {
  const { bookId } = useParams();
  const [loader, setLoader] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [userReview, setUserReview] = useState(null);
  const { getBookReview, submitReview, updateReview, deleteReview } =
    useReviewHook();
  const userData = useSelector((state) => state.user.userData);

  const { handleSubmit, control, reset } = useForm();

  useEffect(() => {
    getReviewData();
  }, [bookId]);

  const getReviewData = async () => {
    const result = await getBookReview(bookId);
    if (result.success) {
      setReviews(result.data);
      checkUserReview();
    }
  };

  const checkUserReview = () => {
    const existingReview = reviews.find((item) => item.user._id == userData.id);
    console.log(existingReview);
    if (existingReview) {
      console.log(existingReview);
      setUserReview(existingReview);
      reset({
        rating: existingReview.rating,
        review: existingReview.review,
      });
    }
    setLoader(false);
  };

  const onSubmit = async (data) => {
    console.log(userReview);
    if (userReview == null) {
      addReview(data);
    } else {
      updateUserReview(data);
    }
  };

  const addReview = async (data) => {
    const newReview = {
      book: bookId,
      review: data.review,
      rating: data.rating,
    };
    const result = await submitReview(newReview);
    if (result.success) {
      window.location.reload();
    }
  };

  const updateUserReview = async (data) => {
    const updateReviewData = {
      reviewId: userReview._id,
      review: data.review,
      rating: data.rating,
    };
    const result = await updateReview(updateReviewData);
    if (result.success) {
      window.location.reload();
    }
  };

  const deletReview = async (reviewId) => {
    const result = await deleteReview(reviewId);
    if (result.success) {
      window.location.reload();
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);

    return formattedDate;
  };

  if (loader) {
    return <Loader></Loader>;
  }

  return (
    <div className="book-review-container">
      <div className="book-review">
        <h1 className="book-review-title">Review & Ratings</h1>
        {reviews.map((review, index) => {
          return (
            <div className="review-item" key={index}>
              <div className="user-info">
                <strong>{review.user && review.user.name}</strong>
                <span className="review-date">{formatDate(review.time)}</span>
              </div>
              <div className="rating">
                <Rating
                  key={index}
                  value={review.rating}
                  count={5}
                  size={24}
                  activeColor="#f4d419"
                  isHalf={true}
                  edit={false}
                />
              </div>
              <div className="comment">{review.review}</div>
              {review.user._id == userData.id && (
                <FontAwesomeIcon
                  className="delete-icon"
                  icon={faTrash}
                  onClick={() => deletReview(review._id)}
                />
              )}
            </div>
          );
        })}
      </div>
      <div className="book-review-input-container">
        <h1 className="book-review-input-title">Rate This Product</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="book-review-input-rating">
            <Controller
              name="rating"
              control={control}
              render={({ field }) => (
                <Rating
                  key={0}
                  value={field.value}
                  field={field}
                  count={5}
                  size={24}
                  activeColor="#f4d419"
                  onChange={(value) => field.onChange(value)}
                />
              )}
            />
          </div>
          <div>
            <Controller
              name="review"
              control={control}
              render={({ field }) => (
                <Input
                  type="text"
                  field={field}
                  placeholder={"Enter your review"}
                  className={"review-input"}
                />
              )}
            />
          </div>
          <Button
            type="submit"
            title="Submit"
            className="review-button"
            onClick={() => {}}
          />
        </form>
      </div>
    </div>
  );
};

export default ReviewDetails;
