import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';

const RestaurantMenu = () => {
    const { restaurantId } = useParams();  // Extract restaurant ID from the URL
    const [menu, setMenu] = useState([]);

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const response = await axiosInstance.get(`/customer/menu/${restaurantId}`);
                setMenu(response.data);  // Set the fetched menu into the state
            } catch (error) {
                console.error('Error fetching menu:', error);
            }
        };

        fetchMenu();
    }, [restaurantId]);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Restaurant Menu</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {menu.length > 0 ? (
                    menu.map((item) => (
                        <div key={item._id} className="border p-4 rounded-lg shadow-lg flex flex-col">
                            <img 
                                src={item.image || 'default-image-url.jpg'} 
                                alt={item.name} 
                                className="w-full h-48 object-cover rounded-md"
                            />
                            <div className="mt-2">
                                <h2 className="text-lg font-bold">{item.name}</h2>

                                {/* Display regular price */}
                                <p className="text-gray-600 font-bold">₹{item.price}</p> 

                                <p className="text-gray-600">Food Type: {item.foodType}</p>

                                {/* Optional Add Button for each product */}
                                <button className="mt-2 px-4 py-2 bg-yellow-500 text-white rounded-md">
                                    Add to Cart
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

export default RestaurantMenu;
