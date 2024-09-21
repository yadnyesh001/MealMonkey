import { useState } from 'react'
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import './App.css';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Header />
      <div className="content">
      </div>

      <Footer />
    </div>
  );
} 


export default App
