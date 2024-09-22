import React from 'react';
import './SearchBox.css';

const SearchBox = () => {
  return (
    <div className="search-box-container">
      <div className="offer-banner">50% off on First delivery</div>
      <h1 className="main-heading">Made with love, Savored with interest.</h1>
      <p className="sub-heading">
        Browse out top categories here to discover different food cuisine.
      </p>

      <div className="search-bar">
        <input
          type="text"
          className="search-input"
          placeholder="Search for Restaurant"
        />
        <button className="search-button">SEARCH</button>
      </div>

      {/* Floating food icons */}
      <div className="floating-icons">
        <div className="food-item food1"></div>
        <div className="food-item food2"></div>
        <div className="food-item food3"></div>
      </div>
    </div>
  );
};

export default SearchBox;
