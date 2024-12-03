
// // Mock Data for Pending Orders
// const pendingOrders = [
//   { id: 1, customerName: "Alice Smith", orderPrice: "$25.99", orderStatus: "pending" },
//   { id: 2, customerName: "John Doe", orderPrice: "$14.50", orderStatus: "pending" },
//   { id: 2, customerName: "John Doe", orderPrice: "$14.50", orderStatus: "pending" },
//   { id: 3, customerName: "Jane Doe", orderPrice: "$30.00", orderStatus: "completed" },
//   { id: 3, customerName: "Jane Doe", orderPrice: "$30.00", orderStatus: "completed" },
//   { id: 4, customerName: "Mark Spencer", orderPrice: "$20.00", orderStatus: "pending" },
//   { id: 4, customerName: "Mark Spencer", orderPrice: "$20.00", orderStatus: "pending" },
// ];

// // Analytics Data
// const analyticsData = [
//   { title: "Today's Completed Orders", value: 25 },
//   { title: "Today's Revenue", value: "$320.50" },
//   { title: "Orders Pending", value: 10 },
//   { title: "Monthly Revenue", value: "$7,250.00" },
// ];


// import React, { useEffect, useState } from "react";
// import { useUser } from "../../contexts/UserProvider";

// const DeliveryPartnerDashboard = () => {
//   const { user } = useUser(); // Access user details from the UserProvider context
//   const [deliveryPartner, setDeliveryPartner] = useState(null);

//   useEffect(() => {
//     setDeliveryPartner(user); // Set the deliveryPartner details when the user is fetched
//   }, [user]);

//   return (
//     <div className="flex">
//       {/* Left Profile Section */}
//       <aside className="w-1/4 h-screen bg-orange-400 to-orange-200">
//         <div className="p-6 text-center">
//           {/* Profile Image */}
//           <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-white">
//             <img
//               src="../../assets/images/boy1.jpg"
//               alt="Profile"
//               className="object-cover"
//             />
//           </div>
//           {/* Dynamic Profile Info */}
//           <h2 className="mt-4 text-xl font-semibold ">
//             {deliveryPartner?.username || "N/A"}
//           </h2>
//           <p className="mt-1 text-sm font-light">
//             {deliveryPartner?.email || "N/A"}
//           </p>
//         </div>
//         {/* Navigation Menu */}
//         <nav className="mt-6 text-sm">
//           <ul className="space-y-4 text-white">
//             <li>
//               <h2 className="block py-2 px-6 hover:bg-orange-500 rounded-lg text-lg font-medium ">
//                 License Number: {deliveryPartner?.license || "N/A"}
//               </h2>
//             </li>
//             <li>
//               <h2 className="block py-2 px-6 hover:bg-orange-500 rounded-lg text-lg font-medium">
//                 Vehicle Number: {deliveryPartner?.vehicleNumber || "N/A"}
//               </h2>
//             </li>
//             <li>
//               <h2 className="block py-2 px-6 hover:bg-orange-500 rounded-lg text-lg font-medium">
//                 Address: {deliveryPartner?.address?.fullAddress || "N/A"}
//               </h2>
//             </li>
//             <li>
//               <h2 className="block py-2 px-6 hover:bg-orange-500 rounded-lg text-lg font-medium">
//                 Pincode: {deliveryPartner?.address?.pincode || "N/A"}
//               </h2>
//             </li>
//             <li>
//               <h2 className="block py-2 px-6 hover:bg-orange-500 rounded-lg text-lg font-medium">
//                 Contact: {deliveryPartner?.contact || "N/A"}
//               </h2>
//             </li>
//           </ul>
//         </nav>
//       </aside>

//       {/* Right Content Section */}
//       <main className="ml-1/4 w-3/4 p-8">
//         {/* Analytics Section */}
//         <div className="grid grid-cols-4 gap-6 mb-6">
//           {analyticsData.map((item, index) => (
//             <div
//               key={index}
//               className="p-4 bg-orange-100 rounded-lg shadow text-center border border-orange-300"
//             >
//               <h3 className="text-lg font-semibold text-orange-800">{item.title}</h3>
//               <p className="text-2xl font-bold text-orange-700">{item.value}</p>
//             </div>
//           ))}
//         </div>

//         {/* Change Profile Section */}
//         <h1 className="text-2xl font-bold text-gray-800">Change Profile</h1>
//         <div className="mt-6 bg-white p-6 rounded-lg shadow-lg h-96 overflow-y-auto">
//           {pendingOrders
//             .filter((order) => order.orderStatus === "pending")
//             .map((order) => (
//               <OrderCard
//                 key={order.id}
//                 customerName={order.customerName}
//                 orderPrice={order.orderPrice}
//               />
//             ))}
//         </div>
//       </main>
      
//     </div>
//   );
// };

// // Reusable Component for Profile Fields
// const ProfileField = ({ label, value, buttonText }) => (
//     <div className="mb-4 flex justify-between items-center">
//       <label className="text-gray-600 font-medium">{label}</label>
//       <div className="flex items-center">
//         <span className="text-gray-800">{value}</span>
//         <button className="ml-4 px-3 py-1 text-orange-500 border border-orange-500 rounded-lg hover:bg-orange-100">
//           {buttonText}
//         </button>
//       </div>
//     </div>
//   );
  
//   // Reusable Component for Pending Orders
//   const OrderCard = ({ customerName, orderPrice }) => (
//     <div className="flex justify-between items-center mb-4 p-4 bg-gray-100 rounded-lg shadow">
//       <div>
//         <h4 className="font-medium text-gray-700">{customerName}</h4>
//         <p className="text-gray-500">{orderPrice}</p>
//       </div>
//       <button className="px-3 py-1 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
//         Deliver
//       </button>
//     </div>
//   );


// export default DeliveryPartnerDashboard;



// import React, { useEffect, useState } from "react";
// import axiosInstance from "../../utils/axiosInstance";
// import { useUser } from "../../contexts/UserProvider";

// const DeliveryPartnerDashboard = () => {
//   const { user } = useUser(); // Access user details from the UserProvider context
//   const [deliveryPartner, setDeliveryPartner] = useState(null);
//   const [pendingOrders, setPendingOrders] = useState([]);
//   const [analyticsData, setAnalyticsData] = useState([]);

//   useEffect(() => {
//     setDeliveryPartner(user); // Set the deliveryPartner details when the user is fetched
//   }, [user]);

//   useEffect(() => {
//     const fetchTodaysOrders = async () => {
//       try {
//         const response = await axiosInstance.get('deliveryPartner/ordersToday'); // API to fetch today's orders
//         setPendingOrders(response.data.filter(order => order.status === 'pending'));
//         calculateAnalytics(response.data);
//       } catch (error) {
//         console.error('Error fetching today\'s orders:', error);
//       }
//     };

//     fetchTodaysOrders();
//   }, []);

//   const calculateAnalytics = (orders) => {
//     const completedOrders = orders.filter(order => order.status === 'completed').length;
//     const totalRevenue = orders.reduce((total, order) => total + order.totalAmount, 0);
//     const pendingOrdersCount = orders.filter(order => order.status === 'pending').length;
//     const monthlyRevenue = orders.reduce((total, order) => {
//       const orderDate = new Date(order.createdAt);
//       const currentMonth = new Date().getMonth();
//       return orderDate.getMonth() === currentMonth ? total + order.totalAmount : total;
//     }, 0);

//     setAnalyticsData([
//       { title: "Today's Completed Orders", value: completedOrders },
//       { title: "Today's Revenue", value: `$${totalRevenue.toFixed(2)}` },
//       { title: "Orders Pending", value: pendingOrdersCount },
//       { title: "Monthly Revenue", value: `$${monthlyRevenue.toFixed(2)}` },
//     ]);
//   };

//   return (
//     <div className="flex">
//       {/* Left Profile Section */}
//       <aside className="w-1/4 h-screen bg-orange-400 to-orange-200">
//         <div className="p-6 text-center">
//           {/* Profile Image */}
//           <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-white">
//             <img
//               src="../../assets/images/boy1.jpg"
//               alt="Profile"
//               className="object-cover"
//             />
//           </div>
//           {/* Dynamic Profile Info */}
//           <h2 className="mt-4 text-xl font-semibold ">
//             {deliveryPartner?.username || "N/A"}
//           </h2>
//           <p className="mt-1 text-sm font-light">
//             {deliveryPartner?.email || "N/A"}
//           </p>
//         </div>
//         {/* Navigation Menu */}
//         <nav className="mt-6 text-sm">
//           <ul className="space-y-4 text-white">
//             <li>
//               <h2 className="block py-2 px-6 hover:bg-orange-500 rounded-lg text-lg font-medium ">
//                 License Number: {deliveryPartner?.license || "N/A"}
//               </h2>
//             </li>
//             <li>
//               <h2 className="block py-2 px-6 hover:bg-orange-500 rounded-lg text-lg font-medium">
//                 Vehicle Number: {deliveryPartner?.vehicleNumber || "N/A"}
//               </h2>
//             </li>
//             <li>
//               <h2 className="block py-2 px-6 hover:bg-orange-500 rounded-lg text-lg font-medium">
//                 Address: {deliveryPartner?.address?.fullAddress || "N/A"}
//               </h2>
//             </li>
//             <li>
//               <h2 className="block py-2 px-6 hover:bg-orange-500 rounded-lg text-lg font-medium">
//                 Pincode: {deliveryPartner?.address?.pincode || "N/A"}
//               </h2>
//             </li>
//             <li>
//               <h2 className="block py-2 px-6 hover:bg-orange-500 rounded-lg text-lg font-medium">
//                 Contact: {deliveryPartner?.contact || "N/A"}
//               </h2>
//             </li>
//           </ul>
//         </nav>
//       </aside>

//       {/* Right Content Section */}
//       <main className="ml-1/4 w-3/4 p-8">
//         {/* Analytics Section */}
//         <div className="grid grid-cols-4 gap-6 mb-6">
//           {analyticsData.map((item, index) => (
//             <div
//               key={index}
//               className="p-4 bg-orange-100 rounded-lg shadow text-center border border-orange-300"
//             >
//               <h3 className="text-lg font-semibold text-orange-800">{item.title}</h3>
//               <p className="text-2xl font-bold text-orange-700">{item.value}</p>
//             </div>
//           ))}
//         </div>

//         {/* Change Profile Section */}
//         <h1 className="text-2xl font-bold text-gray-800">Pending Orders</h1>
//         <div className="mt-6 bg-white p-6 rounded-lg shadow-lg h-96 overflow-y-auto">
//           {pendingOrders.map((order) => (
//             <OrderCard
//               key={order._id}
//               customerName={order.customer.name}
//               orderPrice={`$${order.totalAmount.toFixed(2)}`}
//             />
//           ))}
//         </div>
//       </main>
      
//     </div>
//   );
// };

// // Reusable Component for Profile Fields
// const ProfileField = ({ label, value, buttonText }) => (
//     <div className="mb-4 flex justify-between items-center">
//       <label className="text-gray-600 font-medium">{label}</label>
//       <div className="flex items-center">
//         <span className="text-gray-800">{value}</span>
//         <button className="ml-4 px-3 py-1 text-orange-500 border border-orange-500 rounded-lg hover:bg-orange-100">
//           {buttonText}
//         </button>
//       </div>
//     </div>
//   );
  
//   // Reusable Component for Pending Orders
//   const OrderCard = ({ customerName, orderPrice }) => (
//     <div className="flex justify-between items-center mb-4 p-4 bg-gray-100 rounded-lg shadow">
//       <div>
//         <h4 className="font-medium text-gray-700">{customerName}</h4>
//         <p className="text-gray-500">{orderPrice}</p>
//       </div>
//       <button className="px-3 py-1 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
//         Deliver
//       </button>
//     </div>
//   );


// export default DeliveryPartnerDashboard;



import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useUser } from "../../contexts/UserProvider";
import boy from "../../assets/images/boy1.jpg"; 

const DeliveryPartnerDashboard = () => {
  const { user } = useUser(); // Access user details from the UserProvider context
  const [deliveryPartner, setDeliveryPartner] = useState(null);
  const [pendingOrders, setPendingOrders] = useState([]);
  const [analyticsData, setAnalyticsData] = useState([]);

  useEffect(() => {
    setDeliveryPartner(user); // Set the deliveryPartner details when the user is fetched
  }, [user]);

  useEffect(() => {
    const fetchTodaysOrders = async () => {
      try {
        const response = await axiosInstance.get('deliveryPartner/ordersToday'); // API to fetch today's orders
        setPendingOrders(response.data.filter(order => order.status === 'pending'));
        calculateAnalytics(response.data);
      } catch (error) {
        console.error('Error fetching today\'s orders:', error);
      }
    };

    fetchTodaysOrders();
  }, []);

  const handleAcceptOrder = async (orderId) => {
    try {
      await axiosInstance.put(`/deliveryPartner/orders/${orderId}/status`); // API to update order status
      setPendingOrders(pendingOrders.filter(order => order._id !== orderId));
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const calculateAnalytics = (orders) => {
    const completedOrders = orders.filter(order => order.status === 'completed').length;
    const totalRevenue = orders.reduce((total, order) => total + order.totalAmount, 0);
    const pendingOrdersCount = orders.filter(order => order.status === 'pending').length;
    const monthlyRevenue = orders.reduce((total, order) => {
      const orderDate = new Date(order.createdAt);
      const currentMonth = new Date().getMonth();
      return orderDate.getMonth() === currentMonth ? total + order.totalAmount : total;
    }, 0);

    setAnalyticsData([
      { title: "Today's Completed Orders", value: completedOrders },
      { title: "Today's Revenue", value: `$${totalRevenue.toFixed(2)}` },
      { title: "Orders Pending", value: pendingOrdersCount },
      { title: "Monthly Revenue", value: `$${monthlyRevenue.toFixed(2)}` },
    ]);
  };

  return (
    <div className="flex">
      {/* Left Profile Section */}
      <aside className="w-1/4 h-screen bg-orange-400 to-orange-200">
        <div className="p-6 text-center">
          {/* Profile Image */}
          <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-white">
            <img
              src={boy}
              alt="Profile"
              className="object-cover"
            />
          </div>
          {/* Dynamic Profile Info */}
          <h2 className="mt-4 text-xl font-semibold ">
            {deliveryPartner?.username || "N/A"}
          </h2>
          <p className="mt-1 text-sm font-light">
            {deliveryPartner?.email || "N/A"}
          </p>
        </div>
        {/* Navigation Menu */}
        <nav className="mt-6 text-sm">
          <ul className="space-y-4 text-white">
            <li>
              <h2 className="block py-2 px-6 hover:bg-orange-500 rounded-lg text-lg font-medium ">
                License Number: {deliveryPartner?.license || "N/A"}
              </h2>
            </li>
            <li>
              <h2 className="block py-2 px-6 hover:bg-orange-500 rounded-lg text-lg font-medium">
                Vehicle Number: {deliveryPartner?.vehicleNumber || "N/A"}
              </h2>
            </li>
            <li>
              <h2 className="block py-2 px-6 hover:bg-orange-500 rounded-lg text-lg font-medium">
                Address: {deliveryPartner?.address?.fullAddress || "N/A"}
              </h2>
            </li>
            <li>
              <h2 className="block py-2 px-6 hover:bg-orange-500 rounded-lg text-lg font-medium">
                Pincode: {deliveryPartner?.address?.pincode || "N/A"}
              </h2>
            </li>
            <li>
              <h2 className="block py-2 px-6 hover:bg-orange-500 rounded-lg text-lg font-medium">
                Contact: {deliveryPartner?.contact || "N/A"}
              </h2>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Right Content Section */}
      <main className="ml-1/4 w-3/4 p-8">
        {/* Analytics Section */}
        <div className="grid grid-cols-4 gap-6 mb-6">
          {analyticsData.map((item, index) => (
            <div
              key={index}
              className="p-4 bg-orange-100 rounded-lg shadow text-center border border-orange-300"
            >
              <h3 className="text-lg font-semibold text-orange-800">{item.title}</h3>
              <p className="text-2xl font-bold text-orange-700">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Change Profile Section */}
        <h1 className="text-2xl font-bold text-gray-800">Pending Orders</h1>
        <div className="mt-6 bg-white p-6 rounded-lg shadow-lg h-96 overflow-y-auto">
          {pendingOrders.map((order) => (
            <OrderCard
              key={order._id}
              customerName={order.customerName}
              customerContact={order.customerContact}
              restaurantName={order.restaurantName}
              orderPrice={`Price:  $${order.totalAmount.toFixed(2)}`}
              onAccept={() => handleAcceptOrder(order._id)}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

// Reusable Component for Profile Fields
const ProfileField = ({ label, value, buttonText }) => (
  <div className="mb-4 flex justify-between items-center">
    <label className="text-gray-600 font-medium">{label}</label>
    <div className="flex items-center">
      <span className="text-gray-800">{value}</span>
      <button className="ml-4 px-3 py-1 text-orange-500 border border-orange-500 rounded-lg hover:bg-orange-100">
        {buttonText}
      </button>
    </div>
  </div>
);

// Reusable Component for Pending Orders
const OrderCard = ({ customerName, customerContact, restaurantName, orderPrice, onAccept }) => (
  <div className="flex justify-between items-center mb-4 p-4 bg-gray-100 rounded-lg shadow">
    <div>
      <h4 className="font-medium text-gray-700">Customer: {customerName}</h4>
      <p className="text-gray-500">Contact: {customerContact}</p>
      <p className="text-gray-500">Restaurant: {restaurantName}</p>
      <p className="text-gray-500">{orderPrice}</p>
    </div>
    <button
      onClick={onAccept}
      className="px-3 py-1 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
    >
      Accept
    </button>
  </div>
);

export default DeliveryPartnerDashboard;


