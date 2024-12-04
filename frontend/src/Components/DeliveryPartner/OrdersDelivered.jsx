import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useUser } from "../../contexts/UserProvider";

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
        console.log('Completed Orders:', response.data.orders); // Add this line
        console.log('Revenue:', response.data.revenue); // Add this line
      } catch (error) {
        console.error('Error fetching completed deliveries:', error);
      }
    };
    fetchCompletedOrders();
  }, [user]);

 
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Completed Deliveries</h1>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Total Revenue: ${revenue.toFixed(2)}</h2>
      <div className="grid grid-cols-1 gap-4">
        {completedOrders.map((order) => (
          <OrderCard
            key={order._id}
            customerName={order.customerName}
            customerContact={order.customerContact}
            restaurantName={order.restaurantName}
            orderItems={order.items}
            orderPrice={`Price: $${order.totalAmount.toFixed(2)}`}
          />
        ))}
      </div>
    </div>
  );
};

// Reusable Component for Completed Orders
const OrderCard = ({ customerName, customerContact, restaurantName, orderItems, orderPrice }) => (
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
  </div>
);

export default OrdersDelivered;