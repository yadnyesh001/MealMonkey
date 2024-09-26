import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const AddMenuItemForm = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [foodType, setFoodType] = useState('');
  const [discount, setDiscount] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare form data
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('foodType', foodType);
    formData.append('discount', discount);
    formData.append('image', image); // Append the selected image

    try {
      const res = await axios.post('http://localhost:3000/restaurant/menu/item', formData, {
        // Content-Type is not set; let the browser handle it
        headers: {
          'Content-Type': 'multipart/form-data', // Set the correct content type
        },
        withCredentials: true,
      });
      console.log(res.data);
      console.log(formData);
      alert('Menu item added successfully');
      navigate('/restaurant');
    } catch (error) {
      console.error('Error adding menu item', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-xl shadow-lg w-full max-w-lg animate-fadeIn"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">Add New Menu Item</h2>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Dish Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder-gray-400"
            placeholder="Enter dish name"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder-gray-400"
            placeholder="Enter price"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Food Type:</label>
          <input
            type="text"
            value={foodType}
            onChange={(e) => setFoodType(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder-gray-400"
            placeholder="Enter food type (e.g., Vegan, Non-Veg)"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Discount:</label>
          <input
            type="number"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder-gray-400"
            placeholder="Enter discount (optional)"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-600 focus:outline-none focus:ring-4 focus:ring-purple-300 transition-transform transform hover:scale-105"
        >
          Add Menu Item
        </button>
      </form>
    </div>
  );
};

export default AddMenuItemForm;
