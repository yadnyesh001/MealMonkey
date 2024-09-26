import { useState } from 'react';
import axiosInstance from '../utils/axiosInstance';

const ChangeUserRole = () => {
  const [userEmail, setUserEmail] = useState('');
  const [newRole, setNewRole] = useState('');

  const handleChangeRole = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/admin/changeUserRole', {
        user_email: userEmail,
        newRole,
      });

      if (response.data.success) {
        alert('User role changed successfully');
        // Reset form
        setUserEmail('');
        setNewRole('');
      } else {
        alert('Error: ' + response.data.message);
      }
    } catch (error) {
      console.error('Error changing user role:', error);
      alert('Error changing user role. Please try again.');
    }
  };

  return (
    <form onSubmit={handleChangeRole}>
      <h3>Change User Role</h3>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>New Role:</label>
        <select onChange={(e) => setNewRole(e.target.value)} value={newRole} required>
          <option value="">Select new role</option>
          <option value="customer">Customer</option>
          <option value="restaurant">Restaurant</option>
          <option value="deliveryPartner">Delivery Partner</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <button type="submit">Change Role</button>
    </form>
  );
};

export default ChangeUserRole;
