import { useState } from 'react'
import logo from '/Large Moodify Logo.png'
import './Landing.css'
import Navbar from '../../Components/Navbar'


export default function Landing() {
    const [count, setCount] = useState(0)
    
    return (
      
        <div id='component-wrap'>
            
            <Navbar/>
            {/* <img src={cell} className="logo" alt="cell aura" />
            <h1>i actually fuck with bbw's nigga</h1>
            <h2>Landing</h2> */}
            <div id='content-wrap'>
                    
                    <span>
                    <img src={logo} className="moodify-logo" alt="Moodify Logo"/>
                    <input className='spotify-input' type='text' placeholder='Enter a mood:'/>
                    </span>
            </div>
                
        </div>
        
      
    )
  }
  
  