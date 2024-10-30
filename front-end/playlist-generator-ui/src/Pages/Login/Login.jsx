import { useState } from 'react'
import './Login.css'
import Navbar from '../../Components/Navbar.jsx'
import { useNavigate } from 'react-router-dom'


export default function Login() {
    const navigate = useNavigate();

    async function handleSubmit() {
        try {
            const username = document.getElementById('username-input').value;

            const response = await fetch('https://main-server-production-d039.up.railway.app/getUserProfile', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: username
                })
            })

            if (!response.ok) {
                throw new Error("Failed to get user");
            }

            const data = await response.json();
            sessionStorage.setItem('spotifyUser', JSON.stringify(data)) // store user data
            navigate('/landing') // move on to landing page
        }
        catch (e) {
            alert(e);
        }
    }
    
    return (
      
        <div className='body-wrap'>
            
            <Navbar/>
            <div className='login-wrap'>
                <div className='SpotifyBack'>
                <h1>Login </h1>
                {/* Spotify logo */}
                <img src="../public/Spotify_Primary_Logo_RGB_White.png" alt="Center logo" className="spotify-logo" />
                <input id='username-input' type="text" placeholder="Username...   :-)"/>
                <button onClick={handleSubmit}> submit </button>
                {/* Image in the bottom-left corner */}
                <img src="../public/retrofella_front_post.webp" alt="Bottom Left" className="bottom-left-image" />
                
                {/* Image in the top-right corner */}
                <img src="../public/spookyohohooohoo.webp" alt="Top Right" className="top-right-image" />
                </div>
            </div>
            
        </div>
        
      
    )
  }
  
  