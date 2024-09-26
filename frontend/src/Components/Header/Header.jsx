import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css'; 
import logo from "../../assets/images/logo.png";
import Cookies from 'js-cookie'; // Import js-cookie for easier cookie handling

const Header = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  // Function to check login status from cookies
  useEffect(() => {
    const token = Cookies.get('token'); // Get token from cookies
    const userRole = Cookies.get('role'); // Get role from cookies

    if (token) {
      setLoggedIn(true);
      setRole(userRole); // Set the user's role
    } else {
      setLoggedIn(false);
    }
  }, []);

  // Function to handle logout
  const handleLogout = () => {
    Cookies.remove('token');
    Cookies.remove('role');
    setLoggedIn(false);
    setRole('');
    navigate('/login');
  };

  return (
    <header className='header'>
      <Link to='/' className='w-52'>
        <img src={logo} alt="Logo" />
      </Link>

      <nav className='navbar'>
        
        {loggedIn && role === 'restaurant' && (
          <>
            <Link to='/resturant/dashboard'>Home</Link>
            <Link to='/restaurant/menu/item'>Add dish</Link>
          </>
        )}
        {loggedIn && role === 'delivery' && (
          <>
            <Link to='/deliveryPartner/dashboard'>Home</Link>
            <Link to='/deliveries'>My Deliveries</Link>
          </>
        )}
        {loggedIn && role === 'admin' && (
          <>
            <Link to='/admin/dashboard'>Home</Link>
            <Link to='/admin'>Admin Dashboard</Link>
          </>
        )}
        {loggedIn && role === 'user' && (
          <>
            <Link to='/customer/dashboard'>Home</Link>
            <Link to='/myorders'>My Orders</Link>
          </>
        )}
        {!loggedIn && <Link to='/'>Home</Link>}
        <Link to='/about'>About</Link>
        <Link to='/contact'>Contact</Link>
      </nav>

      <div className='text-xl text-black'>
        {loggedIn ? (
          <button 
            className='relative text-white font-medium ml-[20px] text-[21px] transition-colors duration-300 hover:text-orange-500'
            onClick={handleLogout}
          >
            Logout
          </button>
        ) : (
          <>
            <Link 
              className='relative text-white font-medium ml-[70px] text-[21px] transition-colors duration-300 hover:text-orange-500' 
              to='/login'
            >
              Login
            </Link>
            <Link 
              className='relative text-white font-medium ml-[20px] text-[21px] transition-colors duration-300 hover:text-orange-500'  
              to='/register'
            >
              Register
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
