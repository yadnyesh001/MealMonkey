import  { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';

const SignUp = () => {
  const [formData, setFormData] = useState({name: '', email: '', password: '', role: '', contact: '', fullAddress: '', pincode: ''});
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error
    try {
      const response = await axiosInstance.post('/register', formData);
      if (response.status === 200) {
        navigate.push('/login'); // Redirect to login after successful registration
      }
    } catch (error) {
      setError(error.response?.data || "Registration failed");
    }
  };

  return (                                                                                                                          
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800">Sign Up</h2>
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="mb-4">
            <input
              type="name"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={onChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={onChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={onChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>
          <div className="mb-4">
            <select
              name="role"
              value={formData.role}
              onChange={onChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            >
              <option value="" disabled>Select your role</option>
              <option value="customer">Customer</option>
              <option value="manager">Manager</option>
              <option value="deliveryPartner">Delivery Partner</option>
            </select>
          </div>
          <div className="mb-4">
            <input
              type="Number"
              name="contact"
              placeholder="Enter your contact number"
              value={formData.contact}
              onChange={onChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="fullAddress"
              placeholder="Enter your address"
              value={formData.fulladdress}
              onChange={onChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="Number"
              name="pincode"
              placeholder="Enter your pincode"
              value={formData.pincode}
              onChange={onChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-lg font-semibold transition duration-300"
          >Sign Up
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-orange-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
