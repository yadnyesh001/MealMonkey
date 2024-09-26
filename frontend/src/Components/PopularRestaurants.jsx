// import { useEffect, useState } from 'react';
// import axiosInstance from '../utils/axiosInstance';

// const PopularRestaurants = () => {
//     const [restaurants, setRestaurants] = useState([]);

//     useEffect(() => {
//         const fetchRestaurants = async () => {
//             try {
//                 const response = await axiosInstance.get('/customer/popularRestaurants');
//                 setRestaurants(response.data);  // Set the fetched data into state
//                 console.log(response.data);
//             } catch (error) {
//                 console.error('Error fetching restaurants:', error);
//             }
//         };

//         fetchRestaurants();
//     }, []);

//     return (
//         <div className="p-4">
//             <h1 className="text-2xl font-bold mb-4">Popular Restaurants</h1>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             {restaurants.length > 0 ? (
//     restaurants.map((restaurant) => (
//         <div key={restaurant._id} className="border p-4 rounded-lg shadow-lg">
//             {/* Check if restaurant has a photos array and use the first photo if available */}
//             <img 
//                 src={restaurant.photos && restaurant.photos.length > 0 ? restaurant.photos[0] : 'default-image-url.jpg'} 
//                 alt={restaurant.hotelName || 'Restaurant Image'} 
//                 className="w-full h-48 object-cover rounded-md"
//             />
//             <div className="mt-2">
//                 <h2 className="text-lg font-bold">{restaurant.hotelName || 'Unknown Restaurant'}</h2>
//                 <p className="text-gray-600">Rating: {restaurant.rating || 'N/A'}</p>
//                 <p className="text-gray-600">Known For: {restaurant.knownFor || 'N/A'}</p>
//                 <p className="text-gray-600">{restaurant.address?.fullAddress || 'Address not available'}</p>
//             </div>
//         </div>
//     ))
// ) : (
//     <p>No restaurants available</p>  // Handle the case where there are no restaurants
// )}

//             </div>
//         </div>
//     );
// };

// export default PopularRestaurants;





import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for navigation
import axiosInstance from '../utils/axiosInstance';

const PopularRestaurants = () => {
    const [restaurants, setRestaurants] = useState([]);
    const navigate = useNavigate();  // Initialize navigate function

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const response = await axiosInstance.get('/customer/popularRestaurants');
                setRestaurants(response.data);  // Set the fetched data into state
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching restaurants:', error);
            }
        };

        fetchRestaurants();
    }, []);

    // Function to handle card click and navigate with restaurant id
    const handleCardClick = (restaurantId) => {
        navigate(`/customer/menu/${restaurantId}`);  // Navigate to menu route with restaurant id
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Popular Restaurants</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {restaurants.length > 0 ? (
                restaurants.map((restaurant) => (
                    <div 
                        key={restaurant._id} 
                        className="border p-4 rounded-lg shadow-lg cursor-pointer"  // Add cursor pointer for clarity
                        onClick={() => handleCardClick(restaurant._id)}  // Handle card click
                    >
                        {/* Check if restaurant has a photos array and use the first photo if available */}
                        <img 
                            src={restaurant.photos && restaurant.photos.length > 0 ? restaurant.photos[0] : 'default-image-url.jpg'} 
                            alt={restaurant.hotelName || 'Restaurant Image'} 
                            className="w-full h-48 object-cover rounded-md"
                        />
                        <div className="mt-2">
                            <h2 className="text-lg font-bold">{restaurant.hotelName || 'Unknown Restaurant'}</h2>
                            <p className="text-gray-600">Rating: {restaurant.rating || 'N/A'}</p>
                            <p className="text-gray-600">Known For: {restaurant.knownFor || 'N/A'}</p>
                            <p className="text-gray-600">{restaurant.address?.fullAddress || 'Address not available'}</p>
                        </div>
                    </div>
                ))
            ) : (
                <p>No restaurants available</p>  // Handle the case where there are no restaurants
            )}
            </div>
        </div>
    );
};

export default PopularRestaurants;
