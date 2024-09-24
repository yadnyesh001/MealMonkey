import React from 'react';
import {Link} from 'react-router-dom';
import './Header.css'; 

const Header = () => {
  return (
    <header className='header'>
        <Link to='/' className='logo'>Logo</Link>

        <nav className='navbar'>
            <Link to='/'>Home</Link>
            <Link to='/'>Order</Link>
            <Link to='/'>Blog</Link>
            <Link to='/'>Contact</Link>
        </nav>

        <div className='profile'>
            <img src='https://imgv3.fotor.com/images/blog-cover-image/10-profile-picture-ideas-to-make-you-stand-out.jpg' alt='Profile' className='profile-img' />
            <span className='profile-name'>John Doe</span>
        </div>
    </header>
  );    
};

export default Header;
