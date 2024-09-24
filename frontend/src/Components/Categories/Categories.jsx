import React, { useRef, useState, useEffect } from 'react';
import './Categories.css';
import deliveryBoy from "../../assets/images/delivery-boy.png";
import burger from '../../assets/images/burger.png';
import coffee from '../../assets/images/coffee.png';
import fries from '../../assets/images/fries.png';
import chicken from '../../assets/images/chicken.png';
import pizza from '../../assets/images/pizza.png';
import paneer from '../../assets/images/paneer.png';
import noodles from '../../assets/images/noodles.png';
import donuts from '../../assets/images/donuts.png';

const Categories = () => {
  const scrollRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const cardWidth = window.innerWidth / 5; 
  const visibleCount = 5;
  const categories = [
    { name: 'Coffee', img: coffee },
    { name: 'Fries', img: fries },
    { name: 'Chicken', img: chicken },
    { name: 'Pizza', img: pizza },
    { name: 'Paneer', img: paneer },
    { name: 'Burger', img: burger },
    { name: 'Noodles', img: noodles },
    { name: 'Donuts', img: donuts },
  ];

  const maxScrollPosition = (categories.length - visibleCount) * cardWidth;

  const scrollLeft = () => {
    setScrollPosition((prevPos) => {
      let newPos = prevPos - cardWidth;
      if (newPos < 0) {
        newPos = 0; // Reset to the start if already at the beginning
      }
      return newPos;
    });
  };

  const scrollRight = () => {
    setScrollPosition((prevPos) => {
      let newPos = prevPos + cardWidth;
      if (newPos > maxScrollPosition) {
        newPos = maxScrollPosition; // Keep within the max scroll position
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
          {categories.map((category, index) => (
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
