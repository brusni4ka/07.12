import React from "react";
import { Link } from "react-router-dom";
import "./footer.css";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <Link to="/">
          <h3 className="footer-logo">netflixroulette</h3>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
