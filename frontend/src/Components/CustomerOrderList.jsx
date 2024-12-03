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
            <div className="mb-6 bg-gray-200 p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-xl font-medium mb-2">Wallet Balance: ₹{walletBalance}</h2>
                <div className="flex items-center mt-4 space-x-4">
                    <input
                        type="number"
                        placeholder="Amount to add"
                        value={addAmount}
                        onChange={(e) => setAddAmount(Number(e.target.value))}
                        className="border-2 border-gray-300 rounded-md p-2 w-32 focus:outline-none focus:border-blue-500"
                    />
                    <button
                        onClick={handleAddMoney}
                        className="bg-blue-500 text-white font-medium py-2 px-4 rounded hover:bg-blue-600"
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
                    {orders.map((order) => (
                        <div
                            key={order.restaurantId}
                            className="flex justify-center mb-6 transition-transform duration-300 transform hover:scale-105"
                        >
                            <div className="w-11/12 md:w-7/12 lg:w-7/12 p-4 bg-white shadow-md rounded-lg border border-gray-200">
                                <div className="space-y-3">
                                    <p className="text-lg font-medium">
                                        Order from: <span className="font-normal">{order.restaurantEmail}</span>
                                    </p>
                                    <p>
                                        <strong>Restaurant ID:</strong> {order.restaurantId}
                                    </p>
                                    <p>
                                        <strong>Total Amount:</strong> ₹{order.totalAmount}
                                    </p>
                                    <p>
                                        <strong>Status:</strong>{' '}
                                        <span
                                            className={`px-2 py-1 rounded-md ${
                                                order.status === 'pending'
                                                    ? 'bg-yellow-200 text-yellow-800'
                                                    : order.status === 'accepted'
                                                    ? 'bg-green-200 text-green-800'
                                                    : order.status === 'completed'
                                                    ? 'bg-blue-200 text-blue-800'
                                                    : ''
                                            }`}
                                        >
                                            {order.status}
                                        </span>
                                    </p>
                                    <p>
                                        <strong>Created At:</strong>{' '}
                                        {new Date(order.createdAt).toLocaleString()}
                                    </p>
                                    <div>
                                        <strong>Items:</strong>
                                        <ul className="mt-2 pl-4 list-disc">
                                            {order.items.map((item, idx) => (
                                                <li key={idx}>
                                                    {item.product.name} <span>(Quantity: {item.quantity})</span>
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
