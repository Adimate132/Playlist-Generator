import { useState } from 'react'
import './Login.css'
import Navbar from '../../Components/Navbar.jsx'


export default function Login() {
    const [count, setCount] = useState(0)
    
    return (
      
        <div className='body-wrap'>
            
            <Navbar/>
            <div className='login-wrap'>
                <h1>Login </h1>
                <input type="text" />
                <input type="text" />
                <button> submit </button>
            </div>
            
        </div>
        
      
    )
  }
  
  