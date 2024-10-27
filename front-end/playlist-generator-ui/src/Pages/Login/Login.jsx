import { useState } from 'react'
import './Login.css'
import Navbar from '../../Components/Navbar.jsx'


export default function Login() {
    const [count, setCount] = useState(0)
    
    return (
      
        <div className='body-wrap'>
            
            <Navbar/>
            <div className='login-wrap'>
                <div className='SpotifyBack'>
                <h1>Login </h1>
                {/* Spotify logo */}
                <img src="../public/Spotify_Primary_Logo_RGB_White.png" alt="Center logo" className="spotify-logo" />
                <input type="text" placeholder="Username...   :-)"/>
                <button> submit </button>
                {/* Image in the bottom-left corner */}
                <img src="../public/retrofella_front_post.webp" alt="Bottom Left" className="bottom-left-image" />
                
                {/* Image in the top-right corner */}
                <img src="../public/spookyohohooohoo.webp" alt="Top Right" className="top-right-image" />
                </div>
            </div>
            
        </div>
        
      
    )
  }
  
  