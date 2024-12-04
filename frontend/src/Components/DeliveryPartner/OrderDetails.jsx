import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { motion } from "framer-motion";
import { FaPhoneAlt, FaMapMarkerAlt, FaUserAlt } from "react-icons/fa";

// Fix for default marker icons not displaying correctly in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png'
});

const OrderDetails = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [position, setPosition] = useState([19.0760, 72.8777]); // Default to Mumbai coordinates

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axiosInstance.get(`/deliveryPartner/OrderDetails/${orderId}`);
        setOrder(response.data);
        fetchCoordinates(response.data.restaurant.address.pincode);
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };

    const fetchCoordinates = async (pincode) => {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${pincode}`);
      const data = await response.json();
      if (data.length > 0) {
        const { lat, lon } = data[0];
        setPosition([parseFloat(lat), parseFloat(lon)]);
      } else {
        // Fallback to Mumbai coordinates if no data is returned
        setPosition([19.0760, 72.8777]);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  if (!order) {
    return <div>Loading...</div>;
  }

  const { customer, restaurant, items, totalAmount } = order;

  return (
    <div className="container mx-auto px-6 py-4">
      <motion.h1 className="text-4xl font-extrabold text-center text-orange-600 mb-8 tracking-tight"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}>
        Order Details
      </motion.h1>
      <motion.div className="bg-white p-6 rounded-xl shadow-lg mb-6"
        initial={{ x: -200 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 50 }}>
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
          <FaMapMarkerAlt className="mr-2" /> Restaurant Info
        </h2>
        <p><strong>Name:</strong> {restaurant.hotelName}</p>
        <p><strong>Contact:</strong> {restaurant.contact}</p>
        <p><strong>Address:</strong> {restaurant.address.fullAddress}</p>
        <p><strong>Pincode:</strong> {restaurant.address.pincode}</p>
      </motion.div>
      <motion.div className="bg-white p-6 rounded-xl shadow-lg mb-6"
        initial={{ x: 200 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 50 }}>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Details</h2>
        <p><strong>Total Amount:</strong> ₹{totalAmount.toFixed(2)}</p>
        <h3 className="text-xl font-semibold mt-4">Items</h3>
        <ul className="list-disc list-inside">
          {items.map((item, index) => (
            <li key={index}>{item.product.name} - Quantity: {item.quantity}</li>
          ))}
        </ul>
      </motion.div>
      <motion.div className="bg-white p-6 rounded-xl shadow-lg mb-6"
        initial={{ y: -200 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 50 }}>
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
          <FaUserAlt className="mr-2" /> Customer Info
        </h2>
        <p><strong>Username:</strong> {customer.username}</p>
        <p><strong>Contact:</strong> {customer.contact}</p>
        <p><strong>Address:</strong> {customer.address.fullAddress}, {customer.address.pincode}</p>
      </motion.div>
      <motion.div className="bg-white p-6 rounded-xl shadow-lg mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Map</h2>
        <MapContainer center={position} zoom={15} style={{ height: '400px', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={position}>
            <Popup>Pincode: {restaurant.address.pincode}</Popup>
          </Marker>
        </MapContainer>
      </motion.div>
    </div>
  );
};

export default OrderDetails;