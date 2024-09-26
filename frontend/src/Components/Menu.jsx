import React, { useEffect, useState } from 'react';
import { useUser } from '../contexts/UserProvider';
import axiosInstance from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Menu = () => {
    const { user } = useUser(); // Assuming restaurant data is part of the user context
    const [products, setProducts] = useState([]);
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        const fetchProducts = async () => {
            if (user && user.menu.length > 0) {
                try {
                    const response = await axiosInstance.get(`/restaurant/menu`, {
                        params: { ids: user.menu } // Assuming you have an endpoint to fetch products by IDs
                    });
                    setProducts(response.data); // Set the fetched products into state
                } catch (error) {
                    console.error('Error fetching products:', error);
                }
            }
        };

        fetchProducts();
    }, [user]);

    if (!user) {
        return <div>Loading...</div>; // Handle loading state
    }

    // Function to handle edit button click
    const handleEdit = (id) => {
        navigate(`/restaurant/updateItem/${id}`); // Navigate to the edit route with the product ID
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">{user.hotelName} - Menu</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.length > 0 ? (
                    products.map((product) => (
                        <div key={product._id} className="border p-4 rounded-lg shadow-lg flex flex-col">
                            <img 
                                src={product.image || 'default-image-url.jpg'} 
                                alt={product.name} 
                                className="w-full h-48 object-cover rounded-md"
                            />
                            <div className="mt-2">
                                <h2 className="text-lg font-bold">{product.name}</h2>
                                <p className="text-gray-600 font-bold">₹{product.price}</p>
                                <p className="text-gray-600">Food Type: {product.foodType}</p>
                                {product.Discount && <p className="text-gray-600">Discount: {product.Discount}%</p>}

                                {/* Edit Button for each product */}
                                <button 
                                    className="mt-2 px-4 py-2 bg-yellow-500 text-white rounded-md" 
                                    onClick={() => handleEdit(product._id)} // Call handleEdit with product ID
                                >
                                    Edit
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No menu items available</p>
                )}
            </div>
        </div>
    );
};

export default Menu;
