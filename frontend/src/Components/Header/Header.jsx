import {Link} from 'react-router-dom';
import './Header.css'; 

const Header = () => {


  return (
    <header className='header'>
        <Link to='/' className='logo'>Logo</Link>

        <nav className='navbar'>
            <Link to='/'>Home</Link>
            <Link to='/'>Order</Link>
            <Link to='/about'>About</Link>
            <Link to='/contact'>Contact</Link>
        </nav>

        <div className='text-xl text-black '>
            <Link className='relative text-white font-medium ml-[70px] text-[21px] transition-colors duration-300 hover:text-orange-500 before:absolute before:top-full before:left-0 before:h-[2px] before:w-0 before:bg-white hover:before:w-full before:transition-all before:duration-300' 
            to='/login'>Login</Link>
            
            <Link className='relative text-white font-medium ml-[20px] text-[21px] transition-colors duration-300 hover:text-orange-500 before:absolute before:top-full before:left-0 before:h-[2px] before:w-0 before:bg-white hover:before:w-full before:transition-all before:duration-300'  
            to='/register'>Register</Link>
        </div>
    </header>
  );    
};

export default Header;
