import React from 'react';

const AdminDashboard = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64 h-[700px] bg-gray-900 text-white pt-5 fixed top-[70px] overflow-y-auto">
        <ul className="space-y-4 px-6">
          <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">Get Customers</li>
          <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">Get Restaurants</li>
          <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">Get Delivery Partner</li>
          <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">Get User</li>
          <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">Delete User</li>
          <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">Change User Role</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="ml-64 mt-[70px] p-8 flex-1 min-h-[600px]">
        <h1 className="text-3xl font-semibold mb-6">Admin Dashboard</h1>
        {/* Add your main content here */}
        <p>Welcome to the Admin Dashboard. Use the sidebar to navigate through the different sections.</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
