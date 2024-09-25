import { useEffect, useState } from 'react';
import axios from 'axios';
import RestaurantCard from './RestaurantCard';

const popularRestaurants = () => {
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const response = await axios.get('/customer/popularRestaurants');
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

export default popularRestaurants;
