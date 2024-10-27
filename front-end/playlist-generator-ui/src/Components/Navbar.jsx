import React from 'react'
import {Link} from 'react-router-dom'
import './Navbar.css';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/">i</Link>
        </li>
        <li className="navbar-item">
          <Link to="/Landing">fw</Link>
        </li>
        <li className="navbar-item">
          <Link to="/Login">bbws</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;