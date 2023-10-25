import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faPerson,
  faBook,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";
import useBookHook from "../../../hooks/book/useBookHook";
import Image from "../../../components/elements/image/image";
import ReviewDetails from "../../../components/review/reviewDetails/reviewDetails";
import "./bookDetailsPage.style.scss";

const BookDetailsPage = () => {
  const { bookId } = useParams();
  const [bookData, setBookData] = useState(null);
  const { getBookById } = useBookHook();

  useEffect(() => {
    getBookData();
  }, [bookId]);

  const getBookData = async () => {
    const result = await getBookById(bookId);
    if (result.success) {
      setBookData(result.data);
    }
  };

  return (
    <div className="book-container">
      <div className="book-information">
        <div className="book-images">
          <Image
            className="book-image"
            src={bookData && bookData.image}
          ></Image>
        </div>
        <div className="book-details">
          <h1 className="book-name">{bookData && bookData.title}</h1>
          <h1 className="book-author">
            {bookData && `By ${bookData.author.name}`}
          </h1>
          <p className="book-summary">{bookData && bookData.summary}</p>
          <div className="book-size">
            <h1 className="book-size-title">Genre:</h1>
            <div className="book-sizes">
              {bookData &&
                bookData.genre.map((genre, index) => (
                  <h1 key={index}>{genre}</h1>
                ))}
            </div>
          </div>
          <div className="book-stock-container">
            <FontAwesomeIcon className="book-person-icon" icon={faPerson} />
            <p className="book-stock-amount">
              {bookData && `${bookData.totalSell} People Buy This Book`}
            </p>
          </div>
          <div className="book-stock-container">
            <FontAwesomeIcon className="book-person-icon" icon={faBook} />
            <p className="book-stock-amount">
              {bookData && `${bookData.pageNumber} Pages`}
            </p>
          </div>
          <div className="book-stock-container">
            <FontAwesomeIcon className="book-person-icon" icon={faCalendar} />
            <p className="book-stock-amount">
              {bookData && `Published in ${bookData.publishedDate}`}
            </p>
          </div>
          <div className="book-price-container">
            <p className="book-price-sign">৳</p>
            <h1 className="book-price">{bookData && bookData.price}</h1>
          </div>
          <div className="book-stock-container">
            <FontAwesomeIcon className="book-check-icon" icon={faCheckCircle} />
            <p className="book-stock-amount">
              {bookData && `In Stock (${bookData.stock} copies available)`}
            </p>
          </div>
        </div>
      </div>
      <ReviewDetails></ReviewDetails>
    </div>
  );
};

export default BookDetailsPage;
