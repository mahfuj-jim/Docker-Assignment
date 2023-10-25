/* eslint-disable react/prop-types */
import { useState } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import { updateCartItem, deleteCartItem } from "../../redux/slice/cartSlice";
import { showErrorNotification } from "../elements/tostify/tostify";
import useCartHook from "../../hooks/cart/useCartHook";
import Button from "../elements/button/button";
import Image from "../elements/image/image";
import Counter from "../counter/counter";
import "./cartItem.style.scss";

const CartItem = ({ book }) => {
  const [quantity, setQuantity] = useState(book.quantity);
  const subTotal =
    (book.book.discountPrice ? book.book.discountPrice : book.book.price) *
    quantity;
  const dispatch = useDispatch();
  const { addBookToCart, removeBookFromCart } = useCartHook();

  const updateQuantity = async (newQuantity, isIncrease) => {
    const cartBook = { bookId: book.book._id, quantity: 1 };
    let result;

    try {
      if (isIncrease) {
        result = await addBookToCart(cartBook);
      } else {
        result = await removeBookFromCart(cartBook);
      }

      if (result.success) {
        const updatedBook = { ...book, quantity: newQuantity };
        setQuantity(newQuantity);
        dispatch(updateCartItem(updatedBook));
      } else {
        showErrorNotification("Failed to add to cart");
      }
    } catch (err) {
      showErrorNotification("Failed to add to cart");
    }
  };

  const removeBook = async () => {
    const cartData = {
      bookId: book.book._id,
      quantity: book.quantity,
    };

    const result = await removeBookFromCart(cartData);
    if (result.success) {
      dispatch(deleteCartItem(book));
    }
  };

  return (
    <div className="cart-item-details">
      <div className="cart-book-details">
        <Image
          width={"98px"}
          height={"142px"}
          src={book.book.image}
          alt={book.book.title}
        ></Image>
        <div className="cart-book-information">
          <h4 className="book-title">{book.book.title}</h4>
          <p className="book-author">{`By ${book.book.author.name}`}</p>
          <div className="book-price-row">
            {book.book.discountPrice && (
              <strike className="book-discount-price">{`৳ ${book.book.price}.00`}</strike>
            )}
            <h4 className="book-price">{`৳ ${
              book.book.discountPrice
                ? book.book.discountPrice
                : book.book.price
            }.00`}</h4>
          </div>
          <div className="book-genre">
            {book.book.genre.map((genre, index) => (
              <p key={index}>{genre}</p>
            ))}
          </div>
          <Button
            className={"cart-remove-button"}
            title={"Remove"}
            onClick={removeBook}
          ></Button>
        </div>
      </div>
      <Counter
        quantity={book.quantity}
        updateQuantity={updateQuantity}
      ></Counter>
      <div className="cart-subtotal">
        <h3>{`৳ ${subTotal}`}</h3>
      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default CartItem;
