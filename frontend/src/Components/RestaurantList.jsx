import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import RestaurantCard from './RestaurantCard'; // Create a separate card component for restaurants
import { useParams } from 'react-router-dom';
const RestaurantsList = () => {
    const { foodType } = useParams(); // Get the food type from the URL
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const response = await axiosInstance.get(`/customer/restaurants/by-food-type/${foodType}`);
                setRestaurants(response.data);
            } catch (error) {
                console.error('Error fetching restaurants:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRestaurants();
    }, [foodType]);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="restaurants-list">
            {restaurants.length === 0 ? (
                <p>No restaurants found for this category.</p>
            ) : (
                restaurants.map((restaurant) => (
                    <RestaurantCard key={restaurant._id} restaurant={restaurant} />
                ))
            )}
        </div>
    );
};

export default RestaurantsList;
