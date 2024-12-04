// import React, { useEffect, useState } from "react";
// import axiosInstance from "../../utils/axiosInstance";

// const ActiveOrders = () => {
//   const [acceptedOrders, setAcceptedOrders] = useState([]);

//   useEffect(() => {
//     const fetchAcceptedOrders = async () => {
//       try {
//         const response = await axiosInstance.get("/deliveryPartner/acceptedOrders");
//         setAcceptedOrders(response.data);
//       } catch (error) {
//         console.error("Error fetching accepted orders:", error);
//       }
//     };

//     fetchAcceptedOrders();
//   }, []);

//   const handleCompleteOrder = async (orderId) => {
//     try {
//       await axiosInstance.put(`/deliveryPartner/orders/${orderId}/complete`);
//       setAcceptedOrders(acceptedOrders.filter((order) => order._id !== orderId));
//     } catch (error) {
//       console.error("Error completing order:", error);
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-6">
//       <h1 className="text-4xl font-extrabold text-center text-orange-500 mb-8">
//         Active Orders
//       </h1>
//       <div className="space-y-6">
//         {acceptedOrders.map((order) => (
//           <OrderCard
//             key={order._id}
//             order={order}
//             onComplete={() => handleCompleteOrder(order._id)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// const OrderCard = ({ order, onComplete }) => {
//   const { customerName, customerContact, restaurantName, items, totalAmount } = order;

//   return (
//     <div className="flex items-center bg-gradient-to-r from-orange-200 via-orange-300 to-orange-200 shadow-lg rounded-lg overflow-hidden transition duration-300 hover:shadow-xl max-w-4xl mx-auto">
//       {/* Details Section */}
//       <div className="flex-grow p-6">
//         <h4 className="text-2xl font-semibold text-orange-700 mb-2">
//           {customerName}
//         </h4>
//         <p className="text-gray-600 text-sm">
//           <span className="font-medium">Contact:</span> {customerContact}
//         </p>
//         <p className="text-gray-600 text-sm">
//           <span className="font-medium">Restaurant:</span> {restaurantName}
//         </p>
//         <p className="text-lg font-bold text-orange-800 mt-4">
//           Total: ${totalAmount.toFixed(2)}
//         </p>
//         <ul className="mt-4 space-y-1">
//           {items.map((item, index) => (
//             <li
//               key={index}
//               className="text-gray-700 flex justify-between text-sm border-b border-dashed pb-1"
//             >
//               <span>{item.name}</span>
//               <span className="font-medium">x{item.quantity}</span>
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Button Section */}
//       <button
//         onClick={onComplete}
//         className="m-4 px-6 py-3 text-lg text-white font-semibold rounded-full bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 shadow-md hover:shadow-lg transition-transform transform hover:scale-110 duration-300 ease-in-out"
//       >
//         Complete
//       </button>
//     </div>
//   );
// };

// export default ActiveOrders;

import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";

const ActiveOrders = () => {
  const [acceptedOrders, setAcceptedOrders] = useState([]);
  useEffect(() => {
    const fetchAcceptedOrders = async () => {
      try {
        const response = await axiosInstance.get("/deliveryPartner/acceptedOrders",);
        setAcceptedOrders(response.data);
      } catch (error) {
        console.error("Error fetching accepted orders:", error);
      }
    };

    fetchAcceptedOrders();
  }, []);

  const handleCompleteOrder = async (orderId) => {
    try {
      await axiosInstance.put(`/deliveryPartner/orders/${orderId}/complete`);
      setAcceptedOrders(acceptedOrders.filter((order) => order._id !== orderId));
    } catch (error) {
      console.error("Error completing order:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-4xl font-extrabold text-center text-orange-500 mb-8">
        Active Orders
      </h1>
      <div className="space-y-6">
        {acceptedOrders.map((order) => (
          <OrderCard
            key={order._id}
            order={order}
            onComplete={() => handleCompleteOrder(order._id)}
          />
        ))}
      </div>
    </div>
  );
};

const OrderCard = ({ order, onComplete }) => {
  const { customer, restaurant, items, totalAmount } = order;

  return (
    <div className="flex items-center bg-gradient-to-r from-orange-200 via-orange-300 to-orange-200 shadow-lg rounded-lg overflow-hidden transition duration-300 hover:shadow-xl max-w-4xl mx-auto">
      {/* Details Section */}
      <div className="flex-grow p-6">
        <h4 className="text-2xl font-semibold text-orange-700 mb-2">
          {customer?.username}
        </h4>
        <p className="text-gray-600 text-sm">
          <span className="font-medium">Contact:</span> {customer?.contact}
        </p>
        <p className="text-gray-600 text-sm">
          <span className="font-medium">Restaurant:</span> {restaurant?.hotelName}
        </p>
        <p className="text-lg font-bold text-orange-800 mt-4">
          Total: ${totalAmount.toFixed(2)}
        </p>
        <ul className="mt-4 space-y-1">
          <p className="text-base font-semibold text-orange-800">Items</p>
          {items.map((item, index) => (
            <li
              key={index}
              className="text-gray-700 flex justify-between text-sm border-b border-dashed pb-1 max-w-72"
            >
              <span>{item.product.name}</span>
              <span className="font-medium">x{item.quantity}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Button Section */}
      <button
        onClick={onComplete}
        className="m-4 px-6 py-3 text-lg text-white font-semibold rounded-full bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 shadow-md hover:shadow-lg transition-transform transform hover:scale-110 duration-300 ease-in-out"
      >
        Complete
      </button>
    </div>
  );
};

export default ActiveOrders;