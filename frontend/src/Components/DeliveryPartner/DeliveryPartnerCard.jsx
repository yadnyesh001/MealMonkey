// import React, { useState } from 'react';

// const DeliveryPartnerForm = () => {
//   const [partner, setPartner] = useState({
//     license: '',
//     vehicleNumber: '',
//     isFree: false,
//     orderQueue: [],
//     deliveryHistory: [],
//     reviews: [],
//   });

//   // Handle form input changes
//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setPartner((prev) => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value,
//     }));
//   };

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Form submitted:', partner);
//     // Add form submission logic here, e.g., sending data to a server
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
//       <div className="max-w-lg w-full bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 shadow-xl rounded-lg p-8">
//         <h2 className="text-2xl font-semibold text-white mb-6">Delivery Partner Form</h2>
//         <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
//           <div className="mb-6">
//             <label className="block text-gray-700 font-medium mb-2">License</label>
//             <input
//               type="text"
//               name="license"
//               value={partner.license}
//               onChange={handleChange}
//               className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
//               placeholder="Enter License Number"
//               required
//             />
//           </div>

//           <div className="mb-6">
//             <label className="block text-gray-700 font-medium mb-2">Vehicle Number</label>
//             <input
//               type="text"
//               name="vehicleNumber"
//               value={partner.vehicleNumber}
//               onChange={handleChange}
//               className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
//               placeholder="Enter Vehicle Number"
//               required
//             />
//           </div>

//           <div className="mb-6 flex items-center">
//             <label className="text-gray-700 font-medium mr-4">Is Free</label>
//             <input
//               type="checkbox"
//               name="isFree"
//               checked={partner.isFree}
//               onChange={handleChange}
//               className="form-checkbox h-5 w-5 text-green-600 cursor-pointer"
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600 transition duration-200"
//           >
//             Submit
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default DeliveryPartnerForm;






import React, { useState } from 'react';
import axiosInstance from '../../utils/axiosInstance'; // Adjust the import path as necessary

const DeliveryPartnerForm = () => {
  const [partner, setPartner] = useState({
    license: '',
    vehicleNumber: '',
    isFree: false,
    orderQueue: [],
    deliveryHistory: [],
    reviews: [],
  });

  const [error, setError] = useState('');
  const [userData, setUserData] = useState(null);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPartner((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      setUserData(null);

      const response = await axiosInstance.post('/deliveryPartner/updateProfile', partner);
      if (response.data.message) {
        setError(response.data.message);
      } else {
        setUserData(response.data);
        console.log('Profile updated successfully:', response.data);
        // Handle successful update (e.g., show a success message or redirect)
      }
    } catch (err) {
      setError(err.response ? err.response.data : 'An error occurred while updating profile.');
      console.error('Error updating profile:', err);
      // Handle error (e.g., show an error message)
    }
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
              placeholder="Enter Updated License Number"
              
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
              placeholder="Enter updated Vehicle Number"
              
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

          {error && <p className="text-red-500">{error}</p>}
          {userData && <p className="text-green-500">Profile updated successfully!</p>}

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