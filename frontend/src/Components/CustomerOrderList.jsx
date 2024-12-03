import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';

const OrdersList = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [walletBalance, setWalletBalance] = useState(0); // State for wallet balance
    const [addAmount, setAddAmount] = useState(0); // State for the amount to add

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axiosInstance.get('/customer/orders'); // Adjust the URL if needed
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            } finally {
                setLoading(false);
            }
        };

        const fetchWalletBalance = async () => {
            try {
                const response = await axiosInstance.get('/customer/wallet'); // Adjust the URL if needed
                setWalletBalance(response.data.balance); // Assuming response contains { balance: amount }
            } catch (error) {
                console.error('Error fetching wallet balance:', error);
            }
        };

        fetchOrders();
        fetchWalletBalance(); // Fetch wallet balance on component mount
    }, []);

    const handleAddMoney = async () => {
        try {
            await axiosInstance.post('/customer/addMoney', { amount: addAmount });
            setAddAmount(0); // Reset amount after adding
            const response = await axiosInstance.get('/customer/wallet'); // Refresh wallet balance
            setWalletBalance(response.data.balance);
        } catch (error) {
            console.error('Error adding money to wallet:', error);
        }
    };

    if (loading) return <p className="text-center text-gray-600">Loading orders...</p>;

    return (
        <div className="flex flex-col items-center bg-gray-50 min-h-screen py-8 px-4">
            {/* Wallet Section */}
            <div className="mb-6 bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-lg shadow-lg w-full max-w-md text-black transition-transform duration-300 transform hover:scale-105">
                <h2 className="text-2xl font-semibold">Wallet Balance: ₹{walletBalance}</h2>
                <div className="flex items-center mt-4 space-x-4">
                    <input
                        type="number"
                        placeholder="Amount to add"
                        value={addAmount}
                        onChange={(e) => setAddAmount(Number(e.target.value))}
                        className="border-2 border-gray-300 rounded-md p-3 w-32 focus:outline-none focus:border-blue-500 transition-all duration-200"
                    />
                    <button
                        onClick={handleAddMoney}
                        className="bg-white text-blue-600 font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-gray-100 transition-colors duration-300"
                    >
                        Add Money
                    </button>
                </div>
            </div>

            {/* Orders Section */}
            {orders.length === 0 ? (
                <p className="text-lg text-gray-600">No orders found.</p>
            ) : (
                <div className="w-full">
                    {orders.map((order, index) => (
                        <div
                            key={order.restaurantId}
                            className="flex justify-center mb-6 transition-transform duration-300 transform hover:scale-105"
                        >
                            <div className="w-11/12 md:w-7/12 lg:w-7/12 p-4 bg-gradient-to-br from-white to-gray-50 border-l-4 shadow-md rounded-lg border-blue-400">
                                <div className="space-y-4">
                                    <p className="text-lg font-semibold text-blue-700">
                                        Order from: <span className="font-normal text-gray-700">{order.restaurantEmail}</span>
                                    </p>
                                    <p className="text-gray-800">
                                        <strong className="text-blue-500">Restaurant ID:</strong>{' '}
                                        <span className="text-gray-700">{order.restaurantId}</span>
                                    </p>
                                    <p className="text-gray-800">
                                        <strong className="text-green-500">Total Amount:</strong>{' '}
                                        <span className="text-gray-700">₹{order.totalAmount}</span>
                                    </p>
                                    <p className="text-gray-800">
                                        <strong className="text-yellow-500">Status:</strong>{' '}
                                        <span
                                            className={`${
                                                order.status === 'pending'
                                                    ? 'text-yellow-600 bg-yellow-100 px-2 py-1 rounded-md'
                                                    : 'text-green-600 bg-green-100 px-2 py-1 rounded-md'
                                            } capitalize`}
                                        >
                                            {order.status}
                                        </span>
                                    </p>
                                    <p className="text-gray-800">
                                        <strong className="text-purple-500">Created At:</strong>{' '}
                                        <span className="text-gray-700">{new Date(order.createdAt).toLocaleString()}</span>
                                    </p>
                                    <div className="text-gray-800">
                                        <strong className="text-pink-500">Items:</strong>
                                        <ul className="mt-2 pl-4 list-disc text-gray-700">
                                            {order.items.map((item, idx) => (
                                                <li key={idx} className="py-1">
                                                    {item.name}{' '}
                                                    <span className="text-gray-600">(Quantity: {item.quantity})</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OrdersList;
