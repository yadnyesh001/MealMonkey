// components/RestaurantOrders.js
import React, { useEffect, useState } from 'react';
import { useUser } from '../contexts/UserProvider';
import axiosInstance from '../utils/axiosInstance';

const RestaurantOrders = () => {
    const { user } = useUser();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await axiosInstance.get('/restaurant/orders'); // Adjust the URL based on your API structure
                setOrders(res.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchOrders();
        }
    }, [user]);

    if (loading) {
        return <div className="flex justify-center items-center min-h-screen text-2xl">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-4xl font-bold text-orange-600 mb-8 text-center">Orders</h1>
            <div className="bg-white rounded-lg shadow-md p-6">
                {orders.length === 0 ? (
                    <p className="text-center text-lg text-gray-600">No orders found.</p>
                ) : (
                    <ul className="space-y-4">
                        {orders.map((order) => (
                            <li key={order._id} className="border border-gray-300 rounded-lg p-4 hover:shadow-lg transition-shadow duration-200">
                                <div className="mb-2">
                                    <strong className="text-lg">Order ID:</strong> <span className="text-gray-800">{order._id}</span>
                                </div>
                                <div className="mb-2">
                                    <strong className="text-lg">Total Amount:</strong> <span className="text-gray-800">₹{order.totalAmount.toFixed(2)}</span>
                                </div>
                                <div className="mb-2">
                                    <strong className="text-lg">Customer Email:</strong> <span className="text-gray-800">{order.customer.email}</span>
                                </div>
                                <div className="mb-2">
                                    <strong className="text-lg">Created At:</strong> <span className="text-gray-800">{new Date(order.createdAt).toLocaleString()}</span>
                                </div>
                                <div>
                                    <strong className="text-lg">Items:</strong>
                                    <ul className="mt-2 space-y-1">
                                        {order.items.map((item, index) => (
                                            <li key={index} className="text-gray-700">
                                                <span className="font-semibold">{item.product.name}</span> - <span className="font-bold">Qty: {item.quantity}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default RestaurantOrders;
