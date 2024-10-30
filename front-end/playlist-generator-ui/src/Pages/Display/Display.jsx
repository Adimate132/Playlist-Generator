import { useState } from 'react'
import logo from '/Large Moodify Logo.png'
import './Display.css'
import Navbar from '../../Components/Navbar'

export default function Display() {
    const [count, setCount] = useState(0)
    return (
        <div id='component-wrap'>
            <Navbar/>
            <div className='PlaylistContainer'>
                <h1>Your new plylist is ready!</h1>
                <button id='Exp'> Export to spotify </button>
                <button id='New'> CReate a new playlist </button>
            </div>
        </div>
    )
}