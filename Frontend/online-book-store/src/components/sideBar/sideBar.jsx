import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeUser } from "../../redux/slice/userSlice";
import localStorageFunctions from "../../utils/localStorage";
import "./sideBar.style.scss";

const SideBar = () => {
  const { removeFromLocalStorage } = localStorageFunctions();
  const dispatch = useDispatch();

  const logout = () => {
    removeFromLocalStorage();
    dispatch(removeUser());
  };

  return (
    <Sidebar
      style={{
        height: "100dvh",
        position: "fixed",
        color: "black",
      }}
      backgroundColor="rgb(151, 151, 151)"
    >
      <Menu>
        <MenuItem component={<h3 />}>Admin Dashboard</MenuItem>
        <SubMenu label="Books">
          <MenuItem component={<Link to="/admin/books" />}>Books Data</MenuItem>
          <MenuItem component={<Link to="/admin/add-book" />}>
            Add Book
          </MenuItem>
        </SubMenu>
        <SubMenu label="Authors">
          <MenuItem component={<Link to="/admin/authors" />}>
            Authors Data
          </MenuItem>
          <MenuItem component={<Link to="/admin/add-author" />}>
            Add Author
          </MenuItem>
        </SubMenu>
        <MenuItem component={<Link to="/admin/users" />}>Users Data</MenuItem>
        <MenuItem component={<Link to="/admin/transactions" />}>
          Transactions Data
        </MenuItem>
        <MenuItem component={<Link to="/admin/signup" />}>
            Admin Signup
          </MenuItem>
        {/* <SubMenu label="Discount">
          <MenuItem component={<Link to="/admin/discounts" />}>
            Discounts Data
          </MenuItem>
          <MenuItem component={<Link to="/admin/add-discount" />}>
            Add Discount
          </MenuItem>
        </SubMenu> */}
        <MenuItem component={<p />}></MenuItem>
        <MenuItem component={<p onClick={() => logout()} />}>Logout</MenuItem>
      </Menu>
    </Sidebar>
  );
};

export default SideBar;
