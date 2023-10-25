/* eslint-disable react/prop-types */
import "./input.style.scss";

const Input = ({ type, placeholder, className, field }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={className}
      {...field}
    ></input>
  );
};

export default Input;
