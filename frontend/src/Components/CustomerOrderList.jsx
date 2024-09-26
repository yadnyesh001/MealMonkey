// src/components/OrdersList.jsx
import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import CustomerOrderCard from './CustomerOrderCard';

const OrdersList = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

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

        fetchOrders();
    }, []);

    if (loading) return <p>Loading orders...</p>;

    return (
        <div className="flex flex-wrap justify-center">
            {orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                orders.map(order => (
                    <CustomerOrderCard key={order.restaurantId} order={order} />
                ))
            )}
        </div>
    );
};

export default OrdersList;
