import React from 'react';
import './Header.css'; 

const Header = () => {
  return (
    <header className='header'>
        <a href='/' className='logo'>Logo</a>

        <nav className='navbar'>
            <a href='/'>Home</a>
            <a href='/'>Order</a>
            <a href='/'>Blog</a>
            <a href='/'>Contact</a>
        </nav>

        <div className='profile'>
            <img src='https://imgv3.fotor.com/images/blog-cover-image/10-profile-picture-ideas-to-make-you-stand-out.jpg' alt='Profile' className='profile-img' />
            <span className='profile-name'>John Doe</span>
        </div>
    </header>
  );    
};

export default Header;
