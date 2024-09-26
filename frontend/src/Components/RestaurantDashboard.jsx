import React, { useEffect, useState } from 'react';
import { useUser } from '../contexts/UserProvider';
import axiosInstance from '../utils/axiosInstance'; // Ensure this points to your axios setup

const RestaurantDashboard = () => {
    const { user } = useUser();
    const [restaurant, setRestaurant] = useState(null);
    const [analytics, setAnalytics] = useState(null);
    const [walletBalance, setWalletBalance] = useState(0);
    const [amountToAdd, setAmountToAdd] = useState('');

    useEffect(() => {
        console.log("Current User:", user);
        setRestaurant(user);
    }, [user]);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const res = await axiosInstance.get('/restaurant/analytics/daily');
                console.log('Analytics Data:', res.data);
                setAnalytics(res.data);
            } catch (error) {
                console.error('Error fetching analytics:', error);
            }
        };

        const fetchWalletBalance = async () => {
            try {
                const res = await axiosInstance.get('/restaurant/wallet');
                console.log('Wallet Balance:', res.data);
                setWalletBalance(res.data.balance);
            } catch (error) {
                console.error('Error fetching wallet balance:', error);
            }
        };

        if (user) {
            fetchAnalytics();
            fetchWalletBalance();
        }
    }, [user]);

    const handleAddMoney = async (e) => {
        e.preventDefault();
        try {
            const res = await axiosInstance.post('/restaurant/wallet/add', { amount: Number(amountToAdd) });
            console.log(res.data.message);
            setWalletBalance(res.data.newBalance);
            setAmountToAdd(''); // Reset input field
        } catch (error) {
            console.error('Error adding money to wallet:', error);
        }
    };

    if (!restaurant || !analytics) {
        return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
            <h1 className="text-4xl font-bold text-orange-600 mb-6">Restaurant Dashboard</h1>
            <div className="flex w-full max-w-5xl space-x-6">
                {/* Restaurant Details Section */}
                <div className="bg-white rounded-lg shadow-lg p-6 w-full">
                    <div className="flex flex-col items-center mb-6">
                        {restaurant.photos && restaurant.photos[0] && (
                            <img 
                                src={`http://localhost:3000${restaurant.photos[0]}`} 
                                alt="Restaurant"
                                className="w-96 h-64 mb-4 object-cover border-4 border-orange-300"
                            />
                        )}
                        <h2 className="text-2xl font-semibold text-gray-800">{restaurant.hotelName || 'N/A'}</h2>
                        <p className="text-gray-600">{restaurant.email || 'N/A'}</p>
                        <p className="text-gray-600">{restaurant.contact || 'N/A'}</p>
                        <p className="text-gray-600">{restaurant.address.fullAddress || 'N/A'}</p>
                        <p className="text-gray-600">{restaurant.address.pincode || 'N/A'}</p>
                    </div>

                    {/* Overview Section */}
                    <div className="mt-6">
                        <h3 className="text-lg font-semibold text-gray-700 border-b-2 border-orange-500 pb-2">Overview</h3>
                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <p><strong>Average Cost:</strong> {restaurant.averageCost ? `$${restaurant.averageCost}` : 'N/A'}</p>
                            <p><strong>Type:</strong> {restaurant.type || 'N/A'}</p>
                            <p><strong>Rating:</strong> {restaurant.rating ? restaurant.rating : 'N/A'}/5</p>
                            <p><strong>Open:</strong> {restaurant.isOpen ? 'Yes' : 'No'}</p>
                        </div>
                    </div>

                    {/* Payment Methods Section */}
                    <div className="mt-6">
                        <h3 className="text-lg font-semibold text-gray-700 border-b-2 border-orange-500 pb-2">Payment Methods</h3>
                        <ul className="mt-4 space-y-2">
                            <li className="flex justify-between"><span>Cash:</span> <span>{restaurant.paymentMethods?.cash ? 'Available' : 'Not Available'}</span></li>
                            <li className="flex justify-between"><span>Cards:</span> <span>{restaurant.paymentMethods?.cards ? 'Available' : 'Not Available'}</span></li>
                            <li className="flex justify-between"><span>Digital Payments:</span> <span>{restaurant.paymentMethods?.digitalPayments ? 'Available' : 'Not Available'}</span></li>
                        </ul>
                    </div>

                    {/* Known For Section */}
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

                    {/* Services Section */}
                    <div className="mt-6">
                        <h3 className="text-lg font-semibold text-gray-700 border-b-2 border-orange-500 pb-2">Services</h3>
                        <ul className="mt-4 space-y-2">
                            {Object.entries(restaurant.moreInfo).map(([key, value]) => (
                                <li key={key} className="text-gray-700">{key.charAt(0).toUpperCase() + key.slice(1)}: {value ? 'Yes' : 'No'}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Wallet Balance Section */}
                    <div className="mt-6">
                        <h3 className="text-lg font-semibold text-gray-700 border-b-2 border-orange-500 pb-2">Wallet Balance</h3>
                        <p className="text-lg text-green-600">₹{walletBalance.toFixed(2)}</p>
                        <form onSubmit={handleAddMoney} className="mt-4 flex space-x-2">
                            <input
                                type="number"
                                value={amountToAdd}
                                onChange={(e) => setAmountToAdd(e.target.value)}
                                placeholder="Amount to add"
                                className="border border-gray-300 rounded p-2 w-full"
                                min="1"
                                required
                            />
                            <button type="submit" className="bg-orange-600 text-white rounded px-4 py-2">Add</button>
                        </form>
                    </div>
                </div>

                {/* Analytics Section */}
                <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xs">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Daily Analytics</h2>
                    <div className="space-y-4">
                        <div className="p-4 border border-gray-300 rounded">
                            <h3 className="font-semibold">Total Profit</h3>
                            <p className="text-lg text-green-600">₹{analytics.dailyProfit}</p>
                        </div>
                        <div className="p-4 border border-gray-300 rounded">
                            <h3 className="font-semibold">Daily Average Orders</h3>
                            <p className="text-lg text-blue-600">{analytics.dailyAverageOrders}</p>
                        </div>
                        <div className="p-4 border border-gray-300 rounded">
                            <h3 className="font-semibold">Daily Average Rejected Orders</h3>
                            <p className="text-lg text-red-600">{analytics.dailyAverageRejectedOrders}</p>
                        </div>
                        <div className="p-4 border border-gray-300 rounded">
                            <h3 className="font-semibold">Total Ratings</h3>
                            <p className="text-lg text-purple-600">{analytics.totalRatings}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RestaurantDashboard;
