/* eslint-disable react/prop-types */
import "./button.style.scss";

const Button = ({ className, title, onClick }) => {
  return (
    <button
      className={className}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      {title}
    </button>
  );
};

export default Button;
