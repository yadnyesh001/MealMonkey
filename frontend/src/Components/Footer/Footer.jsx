import React from 'react';
import './Footer.css'; // Importing the CSS file for styling

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h1 className="footer-logo">Logo</h1>
          <p>
            Welcome to our online order website! Here, you can browse our wide
            selection of products and place orders from the comfort of your own home.
          </p>
          <div className="socials">
            <a href="#"><i className="fab fa-facebook"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-linkedin"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-youtube"></i></a>
          </div>
        </div>
        <div className="footer-section links">
          <h2>Company</h2>
          <ul>
            <li><a href="#">About us</a></li>
            <li><a href="#">Contact us</a></li>
            <li><a href="#">Offer</a></li>
            <li><a href="#">FAQs</a></li>
          </ul>
        </div>
        <div className="footer-section links">
          <h2>Account</h2>
          <ul>
            <li><a href="#">My orders</a></li>
            <li><a href="#">Wishlist</a></li>
            <li><a href="#">Shopping Cart</a></li>
            <li><a href="#">Saved Address</a></li>
          </ul>
        </div>
        <div className="footer-section links">
          <h2>Useful Links</h2>
          <ul>
            <li><a href="#">Blogs</a></li>
            <li><a href="#">Login</a></li>
            <li><a href="#">Register</a></li>
            <li><a href="#">Profile</a></li>
            <li><a href="#">Settings</a></li>
          </ul>
        </div>
        <div className="footer-section links">
          <h2>Top Brands</h2>
          <ul>
            <li><a href="#">PizzaBoy</a></li>
            <li><a href="#">Saladish</a></li>
            <li><a href="#">IcePops</a></li>
            <li><a href="#">Mexican Hoy</a></li>
            <li><a href="#">La Foodie</a></li>
          </ul>
        </div>
      </div>
      <hr className="footer-divider" />
      <p className="copyright">© Copyright 2024 MealMonkey. All rights Reserved.</p>
    </footer>
  );
}

export default Footer;
