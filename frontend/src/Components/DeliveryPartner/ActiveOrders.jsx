import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";

const ActiveOrders = () => {
  const [acceptedOrders, setAcceptedOrders] = useState([]);

  useEffect(() => {
    const fetchAcceptedOrders = async () => {
      try {
        const response = await axiosInstance.get('/deliveryPartner/acceptedOrders'); // API to fetch accepted orders
        setAcceptedOrders(response.data);
      } catch (error) {
        console.error('Error fetching accepted orders:', error);
      }
    };

    fetchAcceptedOrders();
  }, []);

  const handleCompleteOrder = async (orderId) => {
    try {
      await axiosInstance.put(`/deliveryPartner/orders/${orderId}/complete`); // API to complete the order
      setAcceptedOrders(acceptedOrders.filter(order => order._id !== orderId));
    } catch (error) {
      console.error('Error completing order:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Accepted Orders</h1>
      <div className="grid grid-cols-1 gap-4">
        {acceptedOrders.map((order) => (
          <OrderCard
            key={order._id}
            customerName={order.customerName}
            customerContact={order.customerContact}
            restaurantName={order.restaurantName}
            orderItems={order.items}
            orderPrice={`Price: $${order.totalAmount.toFixed(2)}`}
            onComplete={() => handleCompleteOrder(order._id)}
          />
        ))}
      </div>
    </div>
  );
};

// Reusable Component for Accepted Orders
const OrderCard = ({ customerName, customerContact, restaurantName, orderItems, orderPrice, onComplete }) => (
  <div className="flex justify-between items-center mb-4 p-4 bg-gray-100 rounded-lg shadow">
    <div>
      <h4 className="font-medium text-gray-700">Customer: {customerName}</h4>
      <p className="text-gray-500">Contact: {customerContact}</p>
      <p className="text-gray-500">Restaurant: {restaurantName}</p>
      <p className="text-gray-500">{orderPrice}</p>
      <ul className="list-disc ml-5">
        {orderItems.map((item, index) => (
          <li key={index} className="text-gray-500">{item.name} - Quantity: {item.quantity}</li>
        ))}
      </ul>
    </div>
    <button
      onClick={onComplete}
      className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600"
    >
      Complete
    </button>
  </div>
);

export default ActiveOrders;