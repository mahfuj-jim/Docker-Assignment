/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
// import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faShoppingCart,
  faUserCircle,
  faUser,
  faWallet,
  faExchangeAlt,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useForm, Controller } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import { removeUser } from "../../redux/slice//userSlice";
import { updateSearchItem } from "../../redux/slice/searchSlice";
import { saveUser } from "../../redux/slice//userSlice";
import { saveCart, emptyCart } from "../../redux/slice/cartSlice.js";
import { showSuccessNotification } from "../elements/tostify/tostify";
import localStorageFunctions from "../../utils/localStorage";
import useUserHook from "../../hooks/user/useUserHook";
import useCartHook from "../../hooks/cart/useCartHook.js";
import HeaderTop from "./headerTop";
import Loader from "../loader/loader";
import Input from "../elements/input/input";
import Button from "../elements/button/button";
// import SuggestionBar from "../suggestionBar/suggestionBar.jsx";
import Image from "../elements/image/image";
// import SuggestionBar from "../suggestionBar/suggestionBar.jsx";
import "./header.style.scss";

import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

const Header = () => {
  const [loader, setLoader] = useState(false);
  const [show, handleShow] = useState(false);
  const [openBalanceModal, setOpenBalanceModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const navigate = useNavigate();
  const { removeFromLocalStorage } = localStorageFunctions();
  const { updateUserBalance, getUserById } = useUserHook();
  const { getUserCart } = useCartHook();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData);
  const reduxCartData = useSelector((state) => state.cart.cartData);
  const { handleSubmit, control, reset } = useForm();

  useEffect(() => {
    handleScroll();
    getUserDetails();
  }, []);

  useEffect(() => {
    if (userData && userData.role == 2) {
      getCartData();
    }
  }, [reduxCartData]);

  const navigateHomePage = () => {
    navigate("/");
  };

  const getUserDetails = async () => {
    try {
      const result = await getUserById(userData.id);
      if (result.success) {
        const balance = result.data.balance;
        const newUserData = { ...userData, balance: balance };
        dispatch(saveUser(newUserData));
      }
    } catch (err) {
      //
    }
  };

  const getCartData = async () => {
    if (reduxCartData.length === 0) {
      const cartData = await getUserCart();
      if (cartData && cartData.length !== 0) {
        setQuantity(cartData.length);
        dispatch(saveCart(cartData));
      } else {
        setQuantity(0);
      }
    } else {
      setQuantity(reduxCartData.length);
    }
  };

  const updateBalance = async (data) => {
    setLoader(true);
    const result = await updateUserBalance(parseInt(data.balance));
    if (result.success) {
      reset({
        balance: "",
      });

      showSuccessNotification("Balance Updated", onCloseModal);
      const balance = userData.balance + parseInt(data.balance);
      const newUserData = { ...userData, balance: balance };
      dispatch(saveUser(newUserData));
    }
    setLoader(false);
  };

  const handleScroll = () => {
    const scrollHandler = () => {
      if (window.scrollY > 25) {
        handleShow(true);
      } else {
        handleShow(false);
      }
    };

    window.addEventListener("scroll", scrollHandler);

    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  };

  const handleInputChange = (value) => {
    dispatch(updateSearchItem(value));
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const logOut = () => {
    setLoader(true);
    removeFromLocalStorage();
    dispatch(emptyCart());
    dispatch(removeUser());
    navigate("/");
    window.location.reload();
  };

  const onOpenModal = () => setOpenBalanceModal(true);

  const onCloseModal = () => setOpenBalanceModal(false);

  return (
    <div>
      <div>
        <HeaderTop></HeaderTop>
      </div>
      <div className={`header-container ${show && "header-container-scroll"}`}>
        <h2 className="header-title" onClick={navigateHomePage}>
          Online Book Store
        </h2>
        <div className="header-search">
          <div className="search-bar">
            <input
              type={"text"}
              placeholder={"Search Products by Title or Tag"}
              className={"search-input"}
              onChange={(e) => handleInputChange(e.target.value)}
            ></input>
            {/* <div className={`suggestion-bar ${showSuggestions ? 'active' : ''}`}>
              <SuggestionBar></SuggestionBar>
            </div> */}
            <FontAwesomeIcon
              className="search-icon"
              icon={faSearch}
              onClick={() => {
                console.log("Search");
              }}
            />
          </div>
          {/* <div>
            <FontAwesomeIcon className="header-filter-icon" icon={faBars} />
          </div> */}
        </div>
        <div className="header-cart">
          <Image
            className={"header-favourite-icon"}
            src={"/src/assets/icons/icon_heart.svg"}
            alt={"favourite"}
          ></Image>
          <Link to="/cart" className="header-cart-element">
            <FontAwesomeIcon
              className="header-cart-icon"
              icon={faShoppingCart}
            />
            <span className="header-cart-badge">{quantity}</span>
          </Link>
          <div className="header-profile">
            <FontAwesomeIcon
              className="header-profile-icon"
              icon={faUserCircle}
              onClick={toggleDropdown}
            />
          </div>
        </div>
      </div>
      <div className="header-profile-dropdown">
        <FontAwesomeIcon
          icon={faUserCircle}
          className="header-profile-icon"
          onClick={toggleDropdown}
        />
        {showDropdown && (
          <div className="header-profile-menu">
            <div
              className="menu-item"
              onClick={() => navigate(`/profile/${userData.id}`)}
            >
              <FontAwesomeIcon icon={faUser} className="menu-icon" />
              <p className="menu-item-text">Edit Profile</p>
            </div>
            <div className="menu-item" onClick={() => onOpenModal()}>
              <FontAwesomeIcon icon={faWallet} className="menu-icon" />
              <p className="menu-item-text">Balance</p>
            </div>
            <div
              className="menu-item"
              onClick={() => {
                navigate(`/transactions/${userData.id}`);
              }}
            >
              <FontAwesomeIcon icon={faExchangeAlt} className="menu-icon" />
              <p className="menu-item-text">Transactions</p>
            </div>
            <div className="menu-item" onClick={logOut}>
              <FontAwesomeIcon icon={faSignOutAlt} className="menu-icon" />
              <p className="menu-item-text">Logout</p>
            </div>
          </div>
        )}
      </div>
      <Modal open={openBalanceModal} onClose={onCloseModal} center>
        <div className="balance-modal">
          <h2 className="balance-title">Balance</h2>
          <div className="current-balance-row">
            <p>Total Balance:</p>
            <p className="balance-text">{`৳ ${userData.balance}`}</p>
          </div>
          <form onSubmit={handleSubmit(updateBalance)}>
            <Controller
              name="balance"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Input
                  type="text"
                  placeholder="Enter your balance"
                  className="balance-input"
                  field={field}
                />
              )}
            />
            {loader ? (
              <Loader />
            ) : (
              <Button
                title="Update Balance"
                className="balance-button"
                onClick={() => {}}
              ></Button>
            )}
          </form>
        </div>
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default Header;
