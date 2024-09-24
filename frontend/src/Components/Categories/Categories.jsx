import React, { useRef, useState, useEffect } from 'react';
import './Categories.css';
import deliveryBoy from "../../assets/images/delivery-boy.png";

const Categories = () => {
  const scrollRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0); 
  const cardWidth = window.innerWidth / 5; 
  const visibleCount = 5;
  const duplicateCount = 3;

  const categories = [
    { name: 'Coffee', img: 'path_to_image' },
    { name: 'Sandwich', img: 'path_to_image' },
    { name: 'Noodles', img: 'path_to_image' },
    { name: 'Pasta', img: 'path_to_image' },
    { name: 'Biryani', img: 'path_to_image' },
    { name: 'Burger', img: 'path_to_image' },
    { name: 'Pizza', img: 'path_to_image' },
    { name: 'Sushi', img: 'path_to_image' },
    { name: 'Salad', img: 'path_to_image' },
    { name: 'Ice Cream', img: 'path_to_image' },
  ];

  const extendedCategories = [
    ...categories.slice(-duplicateCount), 
    ...categories,
    ...categories.slice(0, duplicateCount), 
  ];

  const maxScrollPosition = (categories.length + duplicateCount * 2 - visibleCount) * cardWidth;

  const scrollLeft = () => {
    setScrollPosition((prevPos) => {
      let newPos = prevPos - cardWidth;
      if (newPos < 0) {
        newPos = maxScrollPosition - (visibleCount * cardWidth); 
      }
      return newPos;
    });
  };

  const scrollRight = () => {
    setScrollPosition((prevPos) => {
      let newPos = prevPos + cardWidth;
      if (newPos > maxScrollPosition) {
        newPos = 0; 
      }
      return newPos;
    });
  };

  useEffect(() => {
    scrollRef.current.scrollTo({
      left: scrollPosition,
      behavior: 'smooth',
    });
  }, [scrollPosition]);

  return (
    <div className="categories-section">
      <div className="categories-header">
        <h2 className="categories-title">Categories</h2>
        <div className="scroll-btn-container">
          <button className="scroll-btn left-btn" onClick={scrollLeft}>
            &lt;
          </button>
          <button className="scroll-btn right-btn" onClick={scrollRight}>
            &gt;
          </button>
        </div>
      </div>
      <p className="categories-subtitle">
        Browse our top categories here to discover different food cuisines.
      </p>
      <div className="categories-container">
        <div className="categories-list" ref={scrollRef}>
          {extendedCategories.map((category, index) => (
            <div className="category-card" key={index}>
              <img src={category.img} alt={category.name} className="category-img" />
              <p className="category-name">{category.name}</p>
            </div>
          ))}
        </div>
        <img src={deliveryBoy} alt="Delivery Boy" className="scooter-img" />
      </div>
    </div>
  );
};

export default Categories;
