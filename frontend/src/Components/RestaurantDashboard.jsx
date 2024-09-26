import React, { useEffect, useState } from 'react';
import { useUser } from '../contexts/UserProvider';

const RestaurantDashboard = () => {
    const { user } = useUser();
    const [restaurant, setRestaurant] = useState(null);

    useEffect(() => {
        console.log("Current User:", user);
        setRestaurant(user);
    }, [user]);

    if (!restaurant) {
        return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
            <h1 className="text-4xl font-bold text-orange-600 mb-6">Restaurant Dashboard</h1>
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xl">
                <div className="flex flex-col items-center mb-6">
                    {restaurant.profilePhoto && (
                        <img 
                            src={restaurant.profilePhoto} 
                            alt="Restaurant"
                            className="w-32 h-32 rounded-full mb-4 object-cover border-4 border-orange-300"
                        />
                    )}
                    <h2 className="text-2xl font-semibold text-gray-800">{restaurant.hotelName || 'N/A'}</h2>
                    <p className="text-gray-600">{restaurant.email || 'N/A'}</p>
                    <p className="text-gray-600">{restaurant.contact || 'N/A'}</p>
                    <p className="text-gray-600">{restaurant.address.fullAddress || 'N/A'}</p>
                    <p className="text-gray-600">{restaurant.address.pincode || 'N/A'}</p>
                </div>

                <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-700 border-b-2 border-orange-500 pb-2">Overview</h3>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <p><strong>Average Cost:</strong> {restaurant.averageCost ? `$${restaurant.averageCost}` : 'N/A'}</p>
                        <p><strong>Type:</strong> {restaurant.type || 'N/A'}</p>
                        <p><strong>Rating:</strong> {restaurant.rating ? restaurant.rating : 'N/A'}/5</p>
                        <p><strong>Open:</strong> {restaurant.isOpen ? 'Yes' : 'No'}</p>
                    </div>
                </div>

                <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-700 border-b-2 border-orange-500 pb-2">Payment Methods</h3>
                    <ul className="mt-4 space-y-2">
                        <li className="flex justify-between"><span>Cash:</span> <span>{restaurant.paymentMethods?.cash ? 'Available' : 'Not Available'}</span></li>
                        <li className="flex justify-between"><span>Cards:</span> <span>{restaurant.paymentMethods?.cards ? 'Available' : 'Not Available'}</span></li>
                        <li className="flex justify-between"><span>Digital Payments:</span> <span>{restaurant.paymentMethods?.digitalPayments ? 'Available' : 'Not Available'}</span></li>
                    </ul>
                </div>

                <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-700 border-b-2 border-orange-500 pb-2">Known For</h3>
                    <ul className="mt-4 space-y-2">
                        {restaurant.knownFor.length > 0 ? (
                            restaurant.knownFor.map((item, index) => (
                                <li key={index} className="text-gray-700">• {item}</li>
                            ))
                        ) : (
                            <li className="text-gray-700">N/A</li>
                        )}
                    </ul>
                </div>

                <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-700 border-b-2 border-orange-500 pb-2">Services</h3>
                    <ul className="mt-4 space-y-2">
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
