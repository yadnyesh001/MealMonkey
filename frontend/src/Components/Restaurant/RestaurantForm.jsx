import React, { useState } from 'react';

const RestaurantForm = ({ onSubmit }) => {
  const [restaurantData, setRestaurantData] = useState({
    hotelName: '',
    rating: 0,
    type: 'Mixed',
    knownFor: [],
    moreInfo: {
      breakfast: false,
      takeaway: false,
      homeDelivery: false,
      valetParking: false,
      luxuryDining: false,
      tableBooking: false,
      brunch: false,
      buffet: false,
      indoorSeating: false,
      outdoorSeating: false
    },
    paymentMethods: {
      cash: false,
      cards: false,
      digitalPayments: false
    },
    averageCost: 0,
    photos: [],
    timingFrom: '',
    timingTo: '',
    isOpen: true
  });

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      if (restaurantData.moreInfo.hasOwnProperty(name)) {
        setRestaurantData((prevData) => ({
          ...prevData,
          moreInfo: { ...prevData.moreInfo, [name]: checked }
        }));
      }
      if (restaurantData.paymentMethods.hasOwnProperty(name)) {
        setRestaurantData((prevData) => ({
          ...prevData,
          paymentMethods: { ...prevData.paymentMethods, [name]: checked }
        }));
      }
    } else {
      setRestaurantData((prevData) => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(restaurantData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto bg-gradient-to-r from-blue-100 via-white to-pink-100 p-6 shadow-xl rounded-lg mt-0"
      style={{ paddingTop: '0' }} // Ensure form starts at the top of the page
    >
      {/* Restaurant Name */}
      <div className="mb-4">
        <label htmlFor="hotelName" className="block text-gray-700 font-bold mb-1">Restaurant Name</label>
        <input
          type="text"
          id="hotelName"
          name="hotelName"
          value={restaurantData.hotelName}
          onChange={handleChange}
          className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 transition duration-200 ease-in-out"
          required
        />
      </div>

      {/* Average Cost */}
      <div className="mb-4">
        <label htmlFor="averageCost" className="block text-gray-700 font-bold mb-1">Average Cost (for two)</label>
        <input
          type="number"
          id="averageCost"
          name="averageCost"
          value={restaurantData.averageCost}
          onChange={handleChange}
          className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 transition duration-200 ease-in-out"
          min="0"
          required
        />
      </div>

      {/* Restaurant Type */}
      <div className="mb-4">
        <label htmlFor="type" className="block text-gray-700 font-bold mb-1">Restaurant Type</label>
        <select
          id="type"
          name="type"
          value={restaurantData.type}
          onChange={handleChange}
          className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 transition duration-200 ease-in-out"
        >
          <option value="Pure Veg">Pure Veg</option>
          <option value="Oriental">Oriental</option>
          <option value="Indian">Indian</option>
          <option value="Mixed">Mixed</option>
          <option value="Continental">Continental</option>
          <option value="Italian">Italian</option>
          <option value="Mexican">Mexican</option>
          <option value="Fast Food">Fast Food</option>
        </select>
      </div>

      {/* Operating Hours */}
      <div className="flex mb-4">
        <div className="w-1/2 mr-2">
          <label htmlFor="timingFrom" className="block text-gray-700 font-bold mb-1">Opening Time</label>
          <input
            type="time"
            id="timingFrom"
            name="timingFrom"
            value={restaurantData.timingFrom}
            onChange={handleChange}
            className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 transition duration-200 ease-in-out"
            required
          />
        </div>
        <div className="w-1/2 ml-2">
          <label htmlFor="timingTo" className="block text-gray-700 font-bold mb-1">Closing Time</label>
          <input
            type="time"
            id="timingTo"
            name="timingTo"
            value={restaurantData.timingTo}
            onChange={handleChange}
            className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 transition duration-200 ease-in-out"
            required
          />
        </div>
      </div>

      {/* Payment Methods */}
      <div className="mb-6">
        <label className="block text-gray-800 font-bold mb-1">Payment Methods</label>
        <div className="flex items-center mt-3 space-x-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="cash"
              checked={restaurantData.paymentMethods.cash}
              onChange={handleChange}
              className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-2 focus:ring-indigo-300"
            />
            <span className="ml-2 text-gray-600">Cash</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="cards"
              checked={restaurantData.paymentMethods.cards}
              onChange={handleChange}
              className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-2 focus:ring-indigo-300"
            />
            <span className="ml-2 text-gray-600">Cards</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="digitalPayments"
              checked={restaurantData.paymentMethods.digitalPayments}
              onChange={handleChange}
              className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-2 focus:ring-indigo-300"
            />
            <span className="ml-2 text-gray-600">Digital Payments</span>
          </label>
        </div>
      </div>

      {/* More Info (Services) */}
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-1">Available Services</label>
        <div className="flex flex-wrap mt-2">
          {Object.keys(restaurantData.moreInfo).map((service) => (
            <div key={service} className="flex items-center w-1/2 mb-2">
              <input
                type="checkbox"
                id={service}
                name={service}
                checked={restaurantData.moreInfo[service]}
                onChange={handleChange}
                className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-2 focus:ring-indigo-300"
              />
              <label htmlFor={service} className="ml-2 text-gray-600">
                {service.charAt(0).toUpperCase() + service.slice(1)}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <div className="text-center">
        <button
          type="submit"
          className="bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition duration-200 ease-in-out"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default RestaurantForm;
