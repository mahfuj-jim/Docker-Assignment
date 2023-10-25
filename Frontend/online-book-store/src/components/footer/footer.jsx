import React from "react";
import FooterItem from "./footerItem";
import "./footer.style.scss";

const Footer = () => {
  const footerItems = [
    {
      title: "Online Book Store",
      itemsArray: ["About Us", "Our Team", "Careers", "News", "Contact Us"],
    },
    {
      title: "Product",
      itemsArray: ["Features", "Pricing", "FAQ", "Download"],
    },
    {
      title: "Support",
      itemsArray: ["Help Center", "Documentation", "Community", "Support Plan"],
    },
    {
      title: "Policies",
      itemsArray: [
        "Privacy Policy",
        "Terms of Service",
        "Refund Policy",
        "Shipping Policy",
      ],
    },
  ];

  return (
    <div>
      <footer className="footer-container">
        {footerItems.map((item, index) => (
          <FooterItem
            key={index}
            title={item.title}
            itemsArray={item.itemsArray}
          ></FooterItem>
        ))}
      </footer>
      <p className="footer-text">
        Online Book Store sources a wide range of literary treasures like
        novels, classics, and more. Our collection is curated daily with ❤️️
        from BANGLADESH and shipped worldwide!
      </p>
      <p className="footer-copyright">
        Copyright © 2023 Online Book Store. All Right Reserved
      </p>
    </div>
  );
};

export default Footer;
