// import { useState } from 'react'
import {Route, Routes} from 'react-router-dom';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import SignUp from './Components/SignUp/signUp'
import Login from './Components/Login/Login';
import customerDashboard from './Components/customerDashboard/customerDashboard';
import './App.css';

function App() {
  // const [count, setCount] = useState(0)

  return (
    <div className="App">
        <Routes>
          <Route path="/" 
          element={
          <>
          <Header/>
          <Footer/>
          </>
          }/>
          <Route path="/register" element={<SignUp/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path='/user'>
            <Route path='/dashboard' element={<customerDashboard/>} />
          </Route>
        </Routes>
    </div>
  );
}

export default App;
