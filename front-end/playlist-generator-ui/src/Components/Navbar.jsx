import React from 'react'
import {Link} from 'react-router-dom'
import './Navbar.css';
import { useNavigate } from 'react-router-dom'
import icon from '/Moodify Icon.png'


const Navbar = () => {
    const navigate = useNavigate();
  return (    
    
        <div id='navbar-wrap'>
            
            <ul>
            
                <li>
                    <Link to="/">
                        <img src={icon} className="logo" alt="Moodify Icon" />
                    </Link>
                </li>
                <li><Link to="/">Moodify</Link></li>
                <li><Link to="/Login">Login</Link></li>
                
            </ul>
            
        </div>

    

  );
};

export default Navbar;