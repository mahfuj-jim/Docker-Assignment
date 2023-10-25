import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleRight,
  faSignIn,
  faQuestionCircle,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Image from "../elements/image/image";
import "./headerTop.style.scss";

const HeaderTop = () => {
  const userData = useSelector((state) => state.user.userData);

  return (
    <div className="header-top-container">
      <div className="header-top-offer">
        <Image
          className={"header-top-thunder-icon"}
          src={"https://img.icons8.com/color/48/000000/flash-on.png"}
        ></Image>
        <h4 className="header-top-offer-text">
          EXCLUSIVE BOOK ON SALE | Limited time only
        </h4>
        <FontAwesomeIcon
          className="header-top-icon-cirle-right"
          icon={faArrowCircleRight}
        />
      </div>
      <div className="header-top-help-login">
        <div className="header-top-bulk">
          <FontAwesomeIcon className="header-top-icon-bulk" icon={faTruck} />
          <p className="header-top-bulk-text">Order Bulk</p>
        </div>
        <div className="header-top-help">
          <FontAwesomeIcon
            className="header-top-icon-help"
            icon={faQuestionCircle}
          />
          <p className="header-top-login-text">Help</p>
        </div>
        {!userData.token && (
          <Link to="/login" className="header-top-login">
            <FontAwesomeIcon
              className="header-top-icon-signin"
              icon={faSignIn}
            />
            <p className="header-top-login-text">Login</p>
          </Link>
        )}
      </div>
    </div>
  );
};

export default HeaderTop;
