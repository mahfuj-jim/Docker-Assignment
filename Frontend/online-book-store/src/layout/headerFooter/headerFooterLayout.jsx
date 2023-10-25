/* eslint-disable react/prop-types */
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";

const HeaderFooterLayout = ({ children }) => {
  return (
    <div>
      <Header></Header>
      {children}
      <Footer></Footer>
    </div>
  );
};

export default HeaderFooterLayout;
