import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import SignUp from './Components/SignUp/signUp';
import Login from './Components/Login/Login';
import SearchBox from './Components/SearchBox/SearchBox';
import Categories from './Components/Categories/Categories';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="content-container">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <SearchBox />
                <Categories />
                <Footer />
              </>
            }
          />
          <Route path="/register" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
