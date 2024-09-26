import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';

const UpdateMenuItemForm = () => {
  const { id } = useParams(); // Get the item ID from the URL
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [foodType, setFoodType] = useState('');
  const [discount, setDiscount] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate(); // Add navigate to redirect after update

  useEffect(() => {
    const fetchMenuItem = async () => {
      try {
        const res = await axiosInstance.get(`/restaurant/getItem/${id}`);
        const item = res.data;
        // Ensure the item is defined and contains the expected properties
        if (item) {
          setName(item.name || '');
          setPrice(item.price || '');
          setFoodType(item.foodType || '');
          setDiscount(item.discount || ''); // Handle optional discount
        }
      } catch (error) {
        console.error('Error fetching menu item', error);
      }
    };

    fetchMenuItem();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Log form values before submitting
    console.log('Form Values:', {
      name,
      price,
      foodType,
      discount,
      image
    });

    // Prepare form data
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('foodType', foodType);
    formData.append('discount', discount);
    if (image) {
      formData.append('image', image); // Append the selected image if provided
    }

    try {
      const res = await axiosInstance.put(`/restaurant/updateItem/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set the correct content type
        },
      });
      console.log('Update successful:', res.data);
      alert('Menu item updated successfully'); // Notify user of success
      navigate('/restaurant'); // Redirect after successful update
    } catch (error) {
      console.error('Error updating menu item:', error.response.data);
    }
};


  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-xl shadow-lg w-full max-w-lg animate-fadeIn"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">Update Menu Item</h2>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Dish Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder-gray-400"
            placeholder="Enter dish name" // Set placeholder to existing value
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
            placeholder="Enter price" // Set placeholder to existing value
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
            placeholder="Enter food type (e.g., Vegan, Non-Veg)" // Set placeholder to existing value
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
            placeholder="Enter discount (optional)" // Set placeholder to existing value
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-600 focus:outline-none focus:ring-4 focus:ring-purple-300 transition-transform transform hover:scale-105"
        >
          Update Menu Item
        </button>
      </form>
    </div>
  );
};

export default UpdateMenuItemForm;
