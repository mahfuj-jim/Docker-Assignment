/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { saveCart, emptyCart } from "../../redux/slice/cartSlice";
import {
  showSuccessNotification,
  showErrorNotification,
} from "../../components/elements/tostify/tostify";
import useCartHook from "../../hooks/cart/useCartHook";
import useTransactionHook from "../../hooks/transaction/useTransactionHook";
import Button from "../../components/elements/button/button";
import Input from "../../components/elements/input/input";
import Line from "../../components/elements/line/line";
import CartItem from "../../components/cart/cartItem";
import "./cartPage.style.scss";

const CartPage = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const { getUserCart } = useCartHook();
  const { createTransaction } = useTransactionHook();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reduxCartData = useSelector((state) => state.cart.cartData);

  useEffect(() => {
    getCartData();
  }, [reduxCartData]);

  const navigateHomePage = () => {
    navigate("/");
  };

  const completeTransaction = async () => {
    try {
      const result = await createTransaction();
      if (result.success) {
        dispatch(emptyCart());
        showSuccessNotification("Checkout Successful", navigateHomePage);
      } else {
        showErrorNotification("Failed to checkout");
      }
    } catch (err) {
      showErrorNotification("Failed to checkout");
    }
  };

  const getCartData = async () => {
    if (reduxCartData.length === 0) {
      const result = await getUserCart();

      if (result.length !== 0) {
        const totalPriceCount = countTotalPrice(result);
        setTotalPrice(totalPriceCount);
        dispatch(saveCart(result));
      } else {
        setTotalPrice(0);
      }
    } else {
      const totalPriceCount = countTotalPrice(reduxCartData);
      setTotalPrice(totalPriceCount);
    }
  };

  const countTotalPrice = (data) => {
    const totalPriceCount = data.reduce((total, cartItem) => {
      return (
        total +
        (cartItem.book.discountPrice
          ? cartItem.book.discountPrice
          : cartItem.book.price) *
          cartItem.quantity
      );
    }, 0);

    return totalPriceCount;
  };

  return (
    <div className="cart-page-container">
      <h1 className="cart-page-title">Shopping Cart</h1>
      <div className="cart-full-details">
        <div className="cart-books">
          <h4>{`${reduxCartData.length} Books in Cart`}</h4>
          <Line></Line>
          {reduxCartData.map((book) => (
            <>
              <CartItem book={book}></CartItem>
              <Line></Line>
            </>
          ))}
        </div>
        <div className="cart-details">
          <h4 className="cart-details-total">Total:</h4>
          <h1 className="cart-total-price">{`৳ ${totalPrice}`}</h1>
          <Button
            className={"checkout-button"}
            title={"Checkout"}
            onClick={completeTransaction}
          ></Button>
          <div className="cart-promotion">
            <Line></Line>
            <h4 className="cart-promotion-title">Promotions</h4>
            <div className="cart-promotion-input">
              <Input
                className={"cart-promotion-input-field"}
                placeholder={"Enter Coupon"}
              ></Input>
              <Button
                className={"cart-promotion-button"}
                title={"Apply"}
              ></Button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default CartPage;
