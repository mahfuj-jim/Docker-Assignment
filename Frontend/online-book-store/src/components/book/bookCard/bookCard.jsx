/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import Rating from "react-rating-stars-component";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { saveCartItem, deleteCartItem } from "../../../redux/slice/cartSlice";
import {
  showSuccessNotification,
  showErrorNotification,
} from "../../../components/elements/tostify/tostify";
import useCartHook from "../../../hooks/cart/useCartHook";
import Button from "../../elements/button/button";
import Image from "../../elements/image/image";
import "./bookCard.style.scss";

const BookCard = ({ book }) => {
  book.image = book.image.startsWith("server/images/")
    ? "http://localhost:8000/" + book.image.replace(/^server\//, "")
    : book.image;
    
  const [isInCart, setIsInCart] = useState(false);
  const { addBookToCart, removeBookFromCart } = useCartHook();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const reduxCartData = useSelector((state) => state.cart.cartData);

  useEffect(() => {
    checkInCart();
  }, [reduxCartData]);

  const checkInCart = async () => {
    const bookData = await reduxCartData.find(
      (item) => item.book._id === book._id
    );
    if (bookData) {
      setIsInCart(true);
    }
  };

  const addBook = async () => {
    const cartData = {
      bookId: book._id,
      quantity: 1,
    };

    try {
      const result = await addBookToCart(cartData);
      if (result.success) {
        const cartBookObject = {
          book: {
            _id: book._id,
            title: book.title,
            author: {
              _id: book.author._id,
              name: book.author.name,
            },
            price: book.price,
            genre: book.genre,
            image: book.image,
          },
          quantity: 1,
        };
        dispatch(saveCartItem(cartBookObject));
        showSuccessNotification("Book Added to cart", () => {});
      } else {
        showErrorNotification("Failed to add book in cart");
      }
    } catch (err) {
      showErrorNotification("Failed to add book in cart");
    }
  };

  const removeBook = async () => {
    // const cartData = {
    //   bookId: book._id,
    //   quantity: 1,
    // };

    // const result = await removeBookFromCart(cartData);
    // if (result.success) {
    //   const cartBookObject = {
    //     book: {
    //       _id: book._id,
    //       title: book.title,
    //       author: {
    //         _id: book.author._id,
    //         name: book.author.name,
    //       },
    //       price: book.price,
    //       genre: book.genre,
    //       image: book.image,
    //     },
    //     quantity: 1,
    //   };
    //   dispatch(deleteCartItem(cartBookObject));
    // }
    navigate("/cart");
  };

  const bookDetailsPage = () => {
    navigate(`/book/${book._id}`);
  };

  return (
    <div className="book-card-container">
      <Image
        className={"book-card-image"}
        src={book.image}
        alt={book.title}
      ></Image>
      <div className="book-card-details">
        <h4 className="book-card-title">{book.title}</h4>
        <p className="book-card-author">{`By ${book.author.name}`}</p>
        <div className="book-card-price-row">
          {book.discountPrice && (
            <strike className="book-card-discount-price">{`৳ ${book.price}.00`}</strike>
          )}
          <p className="book-card-price">{`৳ ${
            book.discountPrice ? book.discountPrice : book.price
          }.00`}</p>
        </div>
        <div className="rating">
          <Rating
            key={book._id}
            value={book.rating}
            count={5}
            size={24}
            activeColor="#f4d419"
            isHalf={true}
            edit={false}
          />
        </div>
      </div>
      <div className="cart-button">
        <Button
          className={"book-card-cart-button"}
          title={isInCart ? "View Cart" : "Add to Cart"}
          onClick={isInCart ? removeBook : addBook}
        ></Button>
      </div>
      <div className="view-button">
        <Button
          className={"book-card-view-button"}
          title={"View Details"}
          onClick={bookDetailsPage}
        ></Button>
      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default BookCard;
