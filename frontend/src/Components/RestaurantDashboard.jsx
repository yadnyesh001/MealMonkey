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
                const res = await axiosInstance.get('/restaurant/analytics/daily-weekly');
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
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Analytics</h2>
                    <div className="space-y-4">
                        {/* Daily Analytics */}
                        <div className="p-4 border border-gray-300 rounded">
                            <h3 className="font-semibold">Today's Profit</h3>
                            <p className="text-lg text-green-600">₹{analytics.dailyBalance}</p>
                        </div>
                        <div className="p-4 border border-gray-300 rounded">
                            <h3 className="font-semibold">Today's Orders</h3>
                            <p className="text-lg text-blue-600">{analytics.dailyOrders}</p>
                        </div>
                        <div className="p-4 border border-gray-300 rounded">
                            <h3 className="font-semibold">Max Profit from a Single Order (Today)</h3>
                            <p className="text-lg text-purple-600">₹{analytics.maxDailyProfit}</p>
                        </div>
                        
                        {/* Weekly Analytics */}
                        <div className="p-4 border border-gray-300 rounded">
                            <h3 className="font-semibold">Weekly Profit</h3>
                            <p className="text-lg text-green-600">₹{analytics.weeklyBalance}</p>
                        </div>
                        <div className="p-4 border border-gray-300 rounded">
                            <h3 className="font-semibold">Weekly Orders</h3>
                            <p className="text-lg text-blue-600">{analytics.weeklyOrders}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RestaurantDashboard;
