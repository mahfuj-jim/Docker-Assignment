import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveUser } from "./redux/slice/userSlice";
import localStorageFunctions from "./utils/localStorage";
import AuthenticateUserLogin from "./pages/userPage/authenticateUserPage/authenticateLoginUserPage";
import AuthenticateUserPage from "./pages/userPage/authenticateUserPage/authenticateUserPage";
import AuthenticateAdminPage from "./pages/adminPage/authenticateAdminPage.jsx/authenticateAdminPage";
import LoginPage from "./pages/authPage/loginPage/loginPage";
import SignupPage from "./pages/authPage/signupPage/signupPage";
import ForgetPasswordPage from "./pages/authPage/forgetPasswordPage/forgetPasswordPage";
import ResetPasswordPage from "./pages/authPage/forgetPasswordPage/resetPasswordPage";
import HomePage from "./pages/homePage/homePage";
import CartPage from "./pages/cartPage/cartPage";
import Transactions from "./components/transactions/transactions";
import BookDetailsPage from "./pages/bookPage/bookDetailsPage/bookDetailsPage";
import BookModifyPage from "./pages/bookPage/bookModifyPage/bookModifyPage";
import AuthorListPage from "./pages/authorPage/authorListPage.jsx/authorListPage";
import AuthorModifyPage from "./pages/authorPage/authorModifyPage/authorModifyPage";
import DiscountModifyPage from "./pages/discountPage/discountModifyPage";
import AdminPage from "./pages/adminPage/adminPage";
import BookListPage from "./pages/bookPage/bookListPage/bookListPage";
import UserModifyPage from "./pages/userPage/userModifyPage/userModifyPage";
import UserListPage from "./pages/userPage/userListPage/userListPage";
import TransactionsItem from "./components/transactions/transactionsItem";
import "./App.css";

function App() {
  const { getFromLocalStorage } = localStorageFunctions();
  const dispatch = useDispatch();

  if (getFromLocalStorage().token != null) {
    dispatch(saveUser(getFromLocalStorage()));
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage></LoginPage>} exact></Route>
        <Route path="/signup" element={<SignupPage></SignupPage>} exact></Route>
        <Route
          path="/forget-password"
          element={<ForgetPasswordPage></ForgetPasswordPage>}
          exact
        ></Route>
        <Route
          path="/reset-password/:token/:userId"
          element={<ResetPasswordPage></ResetPasswordPage>}
          exact
        ></Route>
        <Route element={<AuthenticateUserPage />}>
          <Route path="/" element={<HomePage />} exact />
          {/* <Route path="/cart" element={<CartPage />} exact /> */}
          <Route path="/book/:bookId" element={<BookDetailsPage />} exact />
          <Route
            path="/transactions/:userId"
            element={<TransactionsItem />}
            exact
          />
          <Route
            path="/profile/:userId"
            element={<UserModifyPage isAdmin={false}></UserModifyPage>}
            exact
          ></Route>
        </Route>
        <Route element={<AuthenticateUserLogin />}>
          <Route path="/cart" element={<CartPage />} exact />
        </Route>
        <Route element={<AuthenticateAdminPage />}>
          <Route path="/admin" element={<AdminPage></AdminPage>}></Route>
          <Route
            path="/admin/books"
            element={<BookListPage></BookListPage>}
            exact
          ></Route>
          <Route
            path="/admin/add-book"
            element={<BookModifyPage isUpdate={false}></BookModifyPage>}
            exact
          ></Route>
          <Route
            path="/admin/update-book/:bookId"
            element={<BookModifyPage isUpdate={true}></BookModifyPage>}
            exact
          ></Route>
          <Route
            path="/admin/authors"
            element={<AuthorListPage></AuthorListPage>}
          ></Route>
          <Route
            path="/admin/add-author"
            element={<AuthorModifyPage isUpdate={false}></AuthorModifyPage>}
            exact
          ></Route>
          <Route
            path="/admin/update-author/"
            element={<AuthorModifyPage isUpdate={true}></AuthorModifyPage>}
            exact
          ></Route>
          <Route
            path="/admin/users"
            element={<UserListPage></UserListPage>}
            exact
          ></Route>
          <Route
            path="/admin/update-user/:userId"
            element={<UserModifyPage></UserModifyPage>}
            exact
          ></Route>
          <Route
            path="/admin/signup"
            element={<DiscountModifyPage isUpdate={false}></DiscountModifyPage>}
            exact
          ></Route>
          <Route
            path="/admin/update-discount/"
            element={<DiscountModifyPage isUpdate={true}></DiscountModifyPage>}
            exact
          ></Route>
          <Route
            path="/admin/transactions/"
            element={<Transactions></Transactions>}
            exact
          ></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
