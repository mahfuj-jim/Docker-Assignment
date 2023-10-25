/* eslint-disable react/prop-types */
import "./image.style.scss";

const Image = ({className, src, alt, width, height}) => {
  return (
    <img
      className={className}
      src={src}
      alt={alt}
      width={width}
      height={height}
    ></img>
  );
};

export default Image;
