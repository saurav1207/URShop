import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">URShop</Link>
      </div>
      <ul className="navlinks">
        <li className="navlink">
          <Link to="/">Home</Link>
        </li>
        <li className="navlink">
          <Link to="/cart">Cart</Link>
        </li>
        <li className="navlink">
          <Link to="/about">About</Link>
        </li>
        <li className="navlink">
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
