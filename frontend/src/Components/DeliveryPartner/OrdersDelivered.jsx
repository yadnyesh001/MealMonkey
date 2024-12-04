import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useUser } from "../../contexts/UserProvider";

/**
 * OrderCard Component - Displays individual order details
 */
const OrderCard = ({ customerName, customerContact, restaurantName, orderItems, orderPrice }) => (
  <div className="flex justify-between items-center mb-4 p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
    <div className="w-full">
      <div className="mb-4 pb-2 border-b border-gray-200">
        <h4 className="text-lg font-semibold text-gray-800">
          Customer: {customerName}
        </h4>
        <p className="text-gray-600">
          <span className="font-medium">Contact:</span> {customerContact}
        </p>
        <p className="text-gray-600">
          <span className="font-medium">Restaurant:</span> {restaurantName}
        </p>
        <p className="text-green-600 font-semibold mt-2">{orderPrice}</p>
      </div>
      
      <div className="space-y-2">
        <h5 className="font-medium text-gray-700 mb-2">Order Items:</h5>
        <ul className="space-y-1">
          {orderItems.map((item, index) => (
            <li 
              key={index} 
              className="flex justify-between items-center text-gray-600 bg-gray-50 p-2 rounded-md"
            >
              <span>{item.name}</span>
              <span className="font-medium">Qty: {item.quantity}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

/**
 * OrdersDelivered Component - Main component for displaying completed deliveries
 */
const OrdersDelivered = () => {
  const { user } = useUser();
  const [completedOrders, setCompletedOrders] = useState([]);
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    if (!user) return;

    const fetchCompletedOrders = async () => {
      try {
        const response = await axiosInstance.get('/deliveryPartner/deliveriesDone');
        setCompletedOrders(response.data.orders);
        setRevenue(response.data.revenue);
        console.log('Completed Orders:', response.data.orders);
        console.log('Revenue:', response.data.revenue);
      } catch (error) {
        console.error('Error fetching completed deliveries:', error);
      }
    };

    fetchCompletedOrders();
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Completed Deliveries
          </h1>
          <h2 className="text-2xl font-semibold text-green-600 mb-6">
            Total Revenue: ${revenue.toFixed(2)}
          </h2>
        </div>

        <div className="space-y-6">
          {completedOrders.length === 0 ? (
            <div className="text-center text-gray-600 py-8">
              No completed deliveries yet
            </div>
          ) : (
            completedOrders.map((order) => (
              <OrderCard
                key={order._id}
                customerName={order.customerName}
                customerContact={order.customerContact}
                restaurantName={order.restaurantName}
                orderItems={order.items}
                orderPrice={`Price: $${order.totalAmount.toFixed(2)}`}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default OrdersDelivered;