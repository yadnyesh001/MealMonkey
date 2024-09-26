import React, { useState } from 'react';

const DeliveryPartnerForm = () => {
  const [partner, setPartner] = useState({
    license: '',
    vehicleNumber: '',
    isFree: false,
    orderQueue: [],
    deliveryHistory: [],
    reviews: [],
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPartner((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', partner);
    // Add form submission logic here, e.g., sending data to a server
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-lg w-full bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 shadow-xl rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-white mb-6">Delivery Partner Form</h2>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">License</label>
            <input
              type="text"
              name="license"
              value={partner.license}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter License Number"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Vehicle Number</label>
            <input
              type="text"
              name="vehicleNumber"
              value={partner.vehicleNumber}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter Vehicle Number"
              required
            />
          </div>

          <div className="mb-6 flex items-center">
            <label className="text-gray-700 font-medium mr-4">Is Free</label>
            <input
              type="checkbox"
              name="isFree"
              checked={partner.isFree}
              onChange={handleChange}
              className="form-checkbox h-5 w-5 text-green-600 cursor-pointer"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600 transition duration-200"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default DeliveryPartnerForm;
