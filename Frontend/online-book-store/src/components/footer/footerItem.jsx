import React from "react";
import "./footerItem.style.scss";

const FooterItem = ({ title, itemsArray }) => {
  return (
    <div class="footer-column">
      <h3>{title}</h3>
      <ul>
        {itemsArray.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default FooterItem;
