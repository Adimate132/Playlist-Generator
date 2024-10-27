import { useState } from 'react'

import './Login.css'
import Navbar from '../../Components/Navbar'


export default function Login() {
    const [count, setCount] = useState(0)
    
    return (
      
        <div >
            
            <Navbar/>
            <h1>Login </h1>
            
        </div>
        
      
    )
  }
  
  