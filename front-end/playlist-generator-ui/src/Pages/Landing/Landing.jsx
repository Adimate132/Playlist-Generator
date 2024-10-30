import { useEffect, useState } from 'react'
import logo from '/Moodify Icon.png'
import './Landing.css'
import Navbar from '../../Components/Navbar'
import { useNavigate } from 'react-router-dom'


export default function Landing() {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState(null);
    
    useEffect(() => {
        if (!sessionStorage.getItem('spotifyUser')) { // if spotifyUser does not exist in s.storage
            alert('Please login with username first!');
            navigate('/login')
        }
        else { // store info in userInfo var
            console.log("Session storage spotify user: ", JSON.parse(sessionStorage.getItem('spotifyUser')))
            setUserInfo(JSON.parse(sessionStorage.getItem('spotifyUser')));
        }
    }, [])

    useEffect(() => { // log userinfo after updates
        console.log("USER INFO: ", userInfo);
    }, [userInfo])
    
    return (
      
        <div className='page-wrap'>
            
            <Navbar/>
            {/* <img src={cell} className="logo" alt="cell aura" />
            <h1>i actually fuck with bbw's nigga</h1>
            <h2>Landing</h2> */}
            <div className='page-content'>
                <div className='menu-wrap'>
                    <input className='spotify-input' type='text' placeholder='Enter a mood:'/>
                    {userInfo != null ?
                        <div className='greet-user'>
                            <img src={userInfo.user_profile.images[0] ? userInfo.user_profile.images[0].url : logo} alt="your pfp" />
                            <h1> Hello {userInfo.user_profile.display_name}! </h1>
                        </div>
                        : // if no user info...
                        <div className='greet-user'>
                            <h1> Loading... </h1>
                        </div>
                    }
                </div>
            </div>
                
        </div>
        
      
    )
  }
  
  