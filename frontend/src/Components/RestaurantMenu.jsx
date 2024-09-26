// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axiosInstance from '../utils/axiosInstance';

// const RestaurantMenu = () => {
//     const { restaurantId } = useParams();  // Extract restaurant ID from the URL
//     const [menu, setMenu] = useState([]);

//     useEffect(() => {
//         const fetchMenu = async () => {
//             try {
//                 const response = await axiosInstance.get(`/customer/menu/${restaurantId}`);
//                 setMenu(response.data);  // Set the fetched menu into the state
//             } catch (error) {
//                 console.error('Error fetching menu:', error);
//             }
//         };

//         fetchMenu();
//     }, [restaurantId]);

//     return (
//         <div className="p-4">
//             <h1 className="text-2xl font-bold mb-4">Restaurant Menu</h1>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {menu.length > 0 ? (
//                     menu.map((item) => (
                        
//                         <div key={item._id} className="border p-4 rounded-lg shadow-lg flex flex-col">
//                             <img 
//                                 src={item.image} 
//                                 alt={item.name} 
//                                 className="w-full h-48 object-cover rounded-md"
//                             />
//                             <div className="mt-2">
//                                 <h2 className="text-lg font-bold">{item.name}</h2>

//                                 {/* Display regular price */}
//                                 <p className="text-gray-600 font-bold">${item.price}</p> 

//                                 <p className="text-gray-600">Food Type: {item.foodType}</p>

//                                 {/* Optional Add Button for each product */}
//                                 <button className="mt-2 px-4 py-2 bg-yellow-500 text-white rounded-md">
//                                     Add to Cart
//                                 </button>
//                             </div>
//                         </div>
//                     ))
//                 ) : (
//                     <p>No menu items available</p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default RestaurantMenu;



import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';

const RestaurantMenu = () => {
    const { restaurantId } = useParams();  
    const [menu, setMenu] = useState([]);

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const response = await axiosInstance.get(`/customer/menu/${restaurantId}`);
                setMenu(response.data);  
            } catch (error) {
                console.error('Error fetching menu:', error);
            }
        };

        fetchMenu();
    }, [restaurantId]);

    const handleAddToCart = async (itemId) => {
        try {
            const response = await axiosInstance.post('/customer/cart/add', {
                productId: itemId,
                quantity: 1 // Assuming you want to add one item at a time
            });
            console.log("Item added to cart:", response.data);
        } catch (error) {
            console.error("Error adding to cart:", error);
        }
    };
    
    // Update the button inside the map function to call handleAddToCart
    <button
        className="mt-2 px-4 py-2 bg-yellow-500 text-white rounded-md"
        onClick={() => handleAddToCart(item._id)} // Call the function with the product ID
    >
        Add to Cart
    </button>
    

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Restaurant Menu</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {menu.length > 0 ? (
                    menu.map((item) => {
                        // Construct the image URL based on the backend server URL
                        const imageUrl = item.image ? `http://localhost:3000${item.image}` : '/public/Images/1727358391236.jpeg';
                        return (
                            <div key={item._id} className="border p-4 rounded-lg shadow-lg flex flex-col">
                                <img 
                                    src={imageUrl} 
                                    alt={item.name} 
                                    className="w-full h-48 object-cover rounded-md"
                                />
                                <div className="mt-2">
                                    <h2 className="text-lg font-bold">{item.name}</h2>
                                    <p className="text-gray-600 font-bold">${item.price}</p> 
                                    <p className="text-gray-600">Food Type: {item.foodType}</p>
                                    <button className="mt-2 px-4 py-2 bg-yellow-500 text-white rounded-md"
                                    onClick={() => handleAddToCart(item._id)}>
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <p>No menu items available</p>
                )}
            </div>
        </div>
    );
};

export default RestaurantMenu;
