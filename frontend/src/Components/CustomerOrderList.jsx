// src/components/OrdersList.jsx
import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import CustomerOrderCard from './CustomerOrderCard';

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

    if (loading) return <p className="text-center">Loading orders...</p>;

    return (
        <div className="flex flex-col items-center">
            <div className="mb-4">
                <h2 className="text-lg font-semibold">Wallet Balance: ₹{walletBalance}</h2>
                <div className="flex items-center mt-2">
                    <input
                        type="number"
                        placeholder="Amount to add"
                        value={addAmount}
                        onChange={(e) => setAddAmount(Number(e.target.value))}
                        className="border border-gray-300 rounded p-2"
                    />
                    <button onClick={handleAddMoney} className="ml-2 bg-blue-500 text-white p-2 rounded">
                        Add Money
                    </button>
                </div>
            </div>
            {orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
                    {orders.map(order => (
                        <CustomerOrderCard key={order.restaurantId} order={order} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default OrdersList;
