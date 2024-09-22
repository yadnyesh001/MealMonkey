import React, { useState } from 'react';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import SearchBox from './Components/SearchBox/SearchBox';
import Categories from './Components/Categories/Categories';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="content">
        <SearchBox/>
      </div>
      <Categories /> {/* Add the Categories section */}
      <Footer />
    </div>
  );
}

export default App;
