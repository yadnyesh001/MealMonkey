import { useState } from 'react';
import axiosInstance from '../utils/axiosInstance';

const AddMenuItemForm = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [foodType, setFoodType] = useState('');
  const [discount, setDiscount] = useState('');
  const [image, setImage] = useState(null);

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
      const res = await axiosInstance.post('/restaurant/menu/item', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set the correct content type
        },
      });
      console.log(res.data);
    } catch (error) {
      console.error('Error adding menu item', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Dish Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Price:</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Food Type:</label>
        <input
          type="text"
          value={foodType}
          onChange={(e) => setFoodType(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Discount:</label>
        <input
          type="number"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
        />
      </div>

      <div>
        <label>Image:</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          required
        />
      </div>

      <button type="submit">Add Menu Item</button>
    </form>
  );
};

export default AddMenuItemForm;
