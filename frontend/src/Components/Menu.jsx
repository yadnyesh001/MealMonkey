import React, { useState } from 'react';

const Menu = () => {
  const [activeSection, setActiveSection] = useState('Order Online'); // State to track active section
  const [menuItems] = useState([
    { id: 1, name: 'Ultimate Loaded Nacho Fiesta', price: 20, description: 'Hot Nacho Chips', quantity: 1 },
    { id: 2, name: 'Smoked Salmon Bagel', price: 40, description: 'Smoked Biscuit', quantity: 1 },
    { id: 3, name: 'Cranberry Club Sandwich', price: 50, description: 'Vegetables', quantity: 1 },
    { id: 4, name: 'BBQ Chicken Pizza', price: 60, description: 'Topped with BBQ Chicken', quantity: 1 },
    { id: 5, name: 'Classic Cheeseburger', price: 30, description: 'Beef patty, cheese, and lettuce', quantity: 1 },
    { id: 6, name: 'Vegan Buddha Bowl', price: 25, description: 'Quinoa, chickpeas, and veggies', quantity: 1 },
    { id: 7, name: 'Garlic Butter Shrimp Pasta', price: 55, description: 'Pasta with shrimp and garlic sauce', quantity: 1 },
    { id: 8, name: 'Chicken Caesar Salad', price: 35, description: 'Grilled chicken, romaine, and croutons', quantity: 1 },
    { id: 9, name: 'Mango Smoothie', price: 15, description: 'Fresh mango blended with yogurt', quantity: 1 },
    { id: 10, name: 'Chocolate Lava Cake', price: 45, description: 'Warm chocolate cake with molten center', quantity: 1 },
    { id: 11, name: 'Tandoori Chicken', price: 50, description: 'Spiced grilled chicken', quantity: 1 },
    { id: 12, name: 'Spaghetti Bolognese', price: 40, description: 'Traditional Italian pasta with meat sauce', quantity: 1 },
  ]);

  const [cart, setCart] = useState([]);

  const addToCart = (menuItem) => {
    setCart((prevCart) => {
      const itemExists = prevCart.find((item) => item.id === menuItem.id);
      if (itemExists) {
        return prevCart.map((item) =>
          item.id === menuItem.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...menuItem }];
      }
    });
  };

  const updateQuantity = (id, amount) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + amount > 0 ? item.quantity + amount : 0 }
          : item
      );
      return updatedCart.filter((item) => item.quantity > 0);
    });
  };

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const discount = subtotal * 0.1;
  const total = subtotal - discount;

  const renderContent = () => {
    switch (activeSection) {
      case 'Order Online':
        return menuItems.map((menuItem) => (
          <div
            key={menuItem.id}
            className="w-full bg-white border border-gray-200 rounded-lg shadow-lg p-6 flex items-center mb-6"
          >
            <div className="relative">
              <img
                src="https://via.placeholder.com/150"
                alt={menuItem.name}
                className="w-36 h-36 object-cover rounded-md"
              />
            </div>
            <div className="flex flex-col justify-between flex-1 ml-6">
              <h3 className="text-2xl font-semibold text-gray-800">{menuItem.name}</h3>
              <p className="text-md text-gray-600 mt-2">{menuItem.description}</p>
              <div className="flex items-center justify-between mt-6">
                <span className="text-2xl font-semibold text-yellow-500">${menuItem.price}</span>
                <button
                  onClick={() => addToCart(menuItem)}
                  className="bg-yellow-500 text-white text-lg font-semibold px-6 py-3 rounded-lg hover:bg-yellow-600"
                >
                  +Add
                </button>
              </div>
            </div>
          </div>
        ));
      case 'Overview':
        return <p className="text-lg text-gray-600">This is the overview of the restaurant.</p>;
      case 'Photos':
        return <p className="text-lg text-gray-600">Photo gallery coming soon!</p>;
      case 'Reviews':
        return <p className="text-lg text-gray-600">Read reviews from our customers.</p>;
      default:
        return null;
    }
  };

  return (
    <div className="relative w-screen min-h-[135vh] bg-gray-100 flex justify-center">
      {/* Restaurant Header Section */}
      <div className="absolute top-[-30px] w-full bg-[#232220] text-white py-4 flex flex-col items-center h-[200px]">
        <h1 className="text-4xl font-bold text-center mt-6">Restaurant Name</h1>
        <div className="flex mt-16 space-x-40 text-lg">
          {['Order Online', 'Overview', 'Photos', 'Reviews'].map((section) => (
            <span
              key={section}
              onClick={() => setActiveSection(section)}
              className={`cursor-pointer ${
                activeSection === section ? 'text-orange-500 font-semibold' : 'text-gray-600'
              }`}
            >
              {section}
            </span>
          ))}
        </div>
      </div>
  
      {/* Menu or Dynamic Content Section */}
      <div className="absolute left-[12%] top-[200px] w-[45%] max-h-[100vh] overflow-y-auto">
        {renderContent()}
      </div>
  
      {/* Checkout Section */}
      <div className="absolute right-[8%] top-[200px] w-[30%] bg-white border border-gray-200 rounded-lg shadow-lg p-6 max-h-[100vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Cart Items</h2>
        {cart.length > 0 ? (
          cart.map((item) => (
            <div key={item.id} className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-700">{item.name}</h3>
                <p className="text-sm text-gray-500">
                  <span className="text-yellow-500 font-medium">${item.price}</span> x {item.quantity}
                </p>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => updateQuantity(item.id, -1)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-red-100 text-red-500 hover:bg-red-200 font-bold shadow-md"
                >
                  −
                </button>
                <span className="mx-3 text-lg text-gray-700">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, 1)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-green-100 text-green-500 hover:bg-green-200 font-bold shadow-md"
                >
                  +
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">Your cart is empty.</p>
        )}
        <div className="mt-6">
          <div className="flex justify-between text-lg">
            <span className="text-gray-700">Sub Total</span>
            <span className="text-gray-800 font-medium">${subtotal}</span>
          </div>
          <div className="flex justify-between text-lg">
            <span className="text-gray-700">Discount (10%)</span>
            <span className="text-green-600 font-medium">-${discount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-xl mt-4">
            <span className="text-gray-800">To Pay</span>
            <span className="text-yellow-500">${total.toFixed(2)}</span>
          </div>
          <button className="w-full mt-6 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white py-3 rounded-lg text-lg hover:opacity-90 shadow-lg">
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
  
}
  export default Menu;
