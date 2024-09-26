// src/App.jsx
import { Route, Routes } from 'react-router-dom';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import SignUp from './Components/signUp';
import Login from './Components/Login';
import CustomerDashboard from './Components/customerDashboard';
import RestaurantDashboard from './Components/RestaurantDashboard';
import PopularRestaurants from './Components/PopularRestaurants';
import SearchBox from './Components/SearchBox/SearchBox';
import Categories from './Components/Categories/Categories';
import AddMenuItemForm from './Components/AddMenuItemForm';
import './App.css';
import RestaurantForm from './Components/Restaurant/RestaurantForm';
import DeliveryPartnerCard from './Components/DeliveryPartner/DeliveryPartnerCard';
import AboutUs from './Components/AboutUs';
import Contact from './Components/Contact';
import RestaurantMenu from './Components/RestaurantMenu';
import { UserProvider } from './contexts/UserProvider';

const App = () => {
  return (
    <UserProvider>
      <div className="App">
        <Header />
        <div className="content-container">
          <Routes>
            <Route path="/" element={<><SearchBox /><Categories /><Footer /></>} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/customer/dashboard" element={<><SearchBox /><Categories /><PopularRestaurants /><Footer /></>} />
            <Route path="/customer/menu/:restaurantId" element={<RestaurantMenu />} />
            <Route path="/restaurant/dashboard" element={<RestaurantDashboard />} />
            <Route path="/restaurant/profileDetails" element={<RestaurantForm />} />
            <Route path="/restaurant/menu/item" element={<AddMenuItemForm />} />
          </Routes>
        </div>
      </div>
      <Footer/>
    </UserProvider>
  );
}

export default App;
