/* eslint-disable react/prop-types */
import { useState } from "react";
import Button from "../elements/button/button";
import "./counter.style.scss";

const Counter = ({ quantity = 0, updateQuantity }) => {
  const [currentQuantity, setQuantity] = useState(quantity);

  const increaseQuantity = () => {
    updateQuantity(currentQuantity + 1, true);
    setQuantity(currentQuantity + 1);
  };

  const decreaseQuantity = () => {
    if (currentQuantity > 0) {
      updateQuantity(currentQuantity - 1, false);
      setQuantity(currentQuantity - 1);
    }
  };

  return (
    <div className="cart-book-quantity-container">
      <div className="cart-book-quantity">
        <Button
          className={"cart-quantity-button"}
          title={"-"}
          onClick={decreaseQuantity}
        ></Button>
        <p>{currentQuantity}</p>
        <Button
          className={"cart-quantity-button"}
          title={"+"}
          onClick={increaseQuantity}
        ></Button>
      </div>
    </div>
  );
};

export default Counter;
