import React from 'react'
import './Navbar.css';
import { useNavigate } from 'react-router-dom'
import icon from '/Moodify Icon.png'


const Navbar = () => {
    const navigate = useNavigate();

    function handleClick() {
        sessionStorage.clear();
        localStorage.clear();
        navigate('/login');
    }

    return (    
        <div id='navbar-wrap'>
            <ul>
                <li className='logo-and-name' onClick={() => location.reload()}>
                    <img src={icon} className="logo" alt="Moodify Icon" />
                    <p> Moodify </p>
                </li>
                <li className='login' onClick={handleClick}> Login </li>
            </ul>
        </div>
    );
};

export default Navbar;