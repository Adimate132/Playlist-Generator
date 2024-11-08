import { useEffect, useState } from 'react'
import logo from '/Moodify Icon.png'
import './Landing.css'
import Navbar from '../../Components/Navbar'
import { useNavigate } from 'react-router-dom'


export default function Landing() {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState(null);
    const [complete, setComplete] = useState(null);
    
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
                    <div className="content-container">
                        <div className="user-info">
                            <input className='spotify-input' 
                                   type='text' 
                                   placeholder='Enter a mood:'
                            />
                            {userInfo != null ? (
                                <div className='greet-user'>
                                <div className='profile-image-wrap'>
                                    <img 
                                        src={
                                            userInfo.user_profile.images[0] 
                                            ? userInfo.user_profile.images[0].url 
                                            : logo
                                        } 
                                        alt="your pfp" 
                                    />
                                </div>
                                <h1> Hello {userInfo.user_profile.display_name}! </h1>
                            </div>
                            ) : (// if no user info...
                                <div className='greet-user'>
                                    <h1> Loading... </h1>
                                </div>
                            )}
                        </div>
                        {/*Song list (right table)*/}
                        <div className="song-list">
                            {complete ? (
                                <h1 className='container-text'> 
                                    Playlist generated </h1>
                             ) : (
                                <h1 className='container-text' > 
                                    Generating songs based off of your TOP 50 </h1>
                            )}
                            <div className="songs-scroll">
                                <div className="song">imagine this is a Song</div>
                                <div className="song">imagine this is a Song</div>
                                <div className="song">imagine this is a Song</div>
                                <div className="song">imagine this is a Song</div>
                                <div className="song">imagine this is a Song</div>
                                <div className="song">imagine this is a Song</div>
                                <div className="song">imagine this is a Song</div>
                                <div className="song">imagine this is a Song</div>
                                <div className="song">imagine this is a Song</div>
                                <div className="song">imagine this is a Song</div>
                                <div className="song">imagine this is a Song</div>
                                <div className="song">imagine this is a Song</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
  
  