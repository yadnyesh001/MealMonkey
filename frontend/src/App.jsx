import { Route, Routes } from 'react-router-dom';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import SignUp from './Components/signUp';
import Login from './Components/Login';
import CustomerDashboard from './Components/customerDashboard'
import RestaurantDashboard from './Components/RestaurantDashboard'
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
import AdminDashboard from './Components/AdminDashboard';
import GetUser from './Components/GetUser'
import DeleteUser from './Components/DeleteUser'
import ChangeUserRole from './Components/ChangeUserRole'
const App = () => {
  // const handleFormSubmit = (data) => {
  //   console.log('Submitted Data:', data);
  // };
  return (
    <div className="App">
      <Header />
      <div className="content-container">
        <Routes>
          <Route path="/register" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path='/about' element={<AboutUs />} />
          <Route path='/contact' element={<Contact />} />
          <Route path="/" element={
            <>
              <Header />
              <SearchBox />
              <Categories />
              <PopularRestaurants />
            </>
          } />
          <Route path="/customer" element={
            <>
              <Header />
              <SearchBox />
              <Categories />
              <PopularRestaurants />
            </>
          }/>
          <Route path="/customer/dashboard" element={<CustomerDashboard />} />
          <Route path="/customer/menu/:restaurantId" element={<RestaurantMenu />} />
          <Route path="/restaurant" element={<RestaurantDashboard />}/>
          <Route path="/restaurant/profileDetails" element={<RestaurantForm />} />
          <Route path="/restaurant/menu/item" element={<AddMenuItemForm />} />
          <Route path="/admin" element={<AdminDashboard />}/>
          <Route path="/admin/getUser" element={<GetUser />} />
          <Route path="/admin/deleteUser" element={<DeleteUser />} />
          <Route path="/admin/changeUserRole" element={<ChangeUserRole />} />
        </Routes>
      </div>
      {/* <RestaurantForm onSubmit={handleFormSubmit} /> */}
      {/* <DeliveryPartnerCard/> */}
      {/* <AboutUs />  */}
      <Footer/>
    </div>
  );
}

export default App;
