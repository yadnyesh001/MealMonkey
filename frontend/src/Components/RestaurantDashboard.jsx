import React, { useEffect, useState } from 'react';
import { useUser } from '../contexts/userProvider';

const RestaurantDashboard = () => {
    const { currentUser } = useUser(); // Assuming currentUser contains restaurant data
    const [restaurant, setRestaurant] = useState(null);

    useEffect(() => {
        // Assuming currentUser is fetched and contains restaurant details
        setRestaurant(currentUser);
    }, [currentUser]);

    if (!restaurant) {
        return <div>Loading...</div>; // You can customize this loading state
    }

    return (
        <div className="min-h-screen bg-white flex flex-col items-center p-6">
            <h1 className="text-3xl font-bold text-orange-600 mb-4">Restaurant Dashboard</h1>
            <div className="bg-orange-100 rounded-lg shadow-lg p-6 w-full max-w-lg">
                <div className="flex flex-col items-center">
                    {restaurant.profilePhoto && (
                        <img 
                            src={restaurant.profilePhoto} 
                            alt="Restaurant"
                            className="w-32 h-32 rounded-full mb-4 object-cover"
                        />
                    )}
                    <h2 className="text-xl font-semibold">{restaurant.hotelName || 'N/A'}</h2>
                    <p className="text-gray-700">{restaurant.email || 'N/A'}</p>
                    <p className="text-gray-700">{restaurant.contact || 'N/A'}</p>
                    <p className="text-gray-700">{restaurant.address.fullAddress || 'N/A'}</p>
                    <p className="text-gray-700">{restaurant.address.pincode || 'N/A'}</p>
                </div>

                <div className="mt-4">
                    <h3 className="text-lg font-semibold">Overview</h3>
                    <p><strong>Average Cost:</strong> {restaurant.averageCost ? `$${restaurant.averageCost}` : 'N/A'}</p>
                    <p><strong>Type:</strong> {restaurant.type || 'N/A'}</p>
                    <p><strong>Rating:</strong> {restaurant.rating ? restaurant.rating : 'N/A'}/5</p>
                    <p><strong>Open:</strong> {restaurant.isOpen ? 'Yes' : 'No'}</p>
                </div>

                <div className="mt-4">
                    <h3 className="text-lg font-semibold">Payment Methods</h3>
                    <ul>
                        <li>Cash: {restaurant.paymentMethods?.cash ? 'Available' : 'Not Available'}</li>
                        <li>Cards: {restaurant.paymentMethods?.cards ? 'Available' : 'Not Available'}</li>
                        <li>Digital Payments: {restaurant.paymentMethods?.digitalPayments ? 'Available' : 'Not Available'}</li>
                    </ul>
                </div>

                <div className="mt-4">
                    <h3 className="text-lg font-semibold">Known For</h3>
                    <ul>
                        {restaurant.knownFor.length > 0 ? (
                            restaurant.knownFor.map((item, index) => (
                                <li key={index} className="text-gray-700">{item}</li>
                            ))
                        ) : (
                            <li className="text-gray-700">N/A</li>
                        )}
                    </ul>
                </div>

                <div className="mt-4">
                    <h3 className="text-lg font-semibold">Services</h3>
                    <ul>
                        {Object.entries(restaurant.moreInfo).map(([key, value]) => (
                            <li key={key} className="text-gray-700">{key.charAt(0).toUpperCase() + key.slice(1)}: {value ? 'Yes' : 'No'}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default RestaurantDashboard;
