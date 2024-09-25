import { useEffect, useState } from 'react';
import RestaurantCard from './RestaurantCard';
import axiosInstance from '../utils/axiosInstance';

const PopularRestaurants = () => {
    const [restaurants, setRestaurants] = useState([]);
    console.log("Hello")
    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const response = await axiosInstance.get('/customer/popularRestaurants');
                setRestaurants(response.data);
            } catch (error) {
                console.error("Error fetching restaurants:", error);
            }
        };

        fetchRestaurants();
    }, []);

    return (
        <div className="grid grid-cols-2 gap-4"> {/* Tailwind grid for 2 items per row */}
            {restaurants.map((restaurant, index) => (
                <RestaurantCard key={index} restaurant={restaurant} />
            ))}
        </div>
    );
};

export default PopularRestaurants;
