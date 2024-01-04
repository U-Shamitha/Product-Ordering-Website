import React, { useContext } from 'react'
import './Menus.css'
import { FcAbout, FcBriefcase, FcBusinessContact, FcHome, FcParallelTasks, FcReading, FcStackOfPhotos } from "react-icons/fc";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faClose, faHome, faPerson, faPersonRifle, faSignIn, faSignInAlt, faSignOut, faSignOutAlt, faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { Typography } from '@mui/material';
import authContext from '../../context/authContext';

const Menus = ({toggle, setToggle}) => {

  const {authenticated, setAuthenticated} = useContext(authContext);
  console.log(authenticated);
  const user = !!localStorage.getItem("currentUser") ? JSON.parse(localStorage.getItem("currentUser")) : ''

  return (
    <>
        {toggle ? (
            <>
                <div className='flex justify-end'>
                    <FontAwesomeIcon icon={faClose} size='lg' className='p-4 hover:text-white hover:bg-red-600' onClick={()=>setToggle(!toggle)}/>
                </div>
                <div className='navbar-profile-pic'>
                <img src={user ? user.image :"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSJfP-OoenL4RtlQsjDBWtjiVyqHL_xJleTSHD3St0bQ&s"} alt="profile pic" />
                <Typography variant="h6" sx={{ p: 2 }} style={{textAlign:'center'}}>
                    {user ? user.username : 'your name'}
                </Typography>
                </div>
                <div className='nav-items'>
                    <div className='nav-item'>
                        {authenticated ?
                        <>
                            <Link to="/home" onClick={()=>setToggle(!toggle)} className='nav-link'>
                                <FontAwesomeIcon icon={faHome}/>
                                Home
                            </Link>
                            <hr/>
                            <Link to="/cart" onClick={()=>setToggle(!toggle)} className='nav-link'>
                                <FontAwesomeIcon icon={faCartShopping}/>
                                Cart
                            </Link>
                            <hr/>
                            <Link to="/profile" onClick={()=>setToggle(!toggle)} className='nav-link'>
                                <FontAwesomeIcon icon={faUserAlt}/>
                                Profile
                            </Link>
                            <hr/>
                            <Link to="/login" onClick={()=>{
                                setToggle(!toggle);
                                localStorage.removeItem("currentUser");
                                setAuthenticated(false);
                            }
                            } className='nav-link'>
                            <FontAwesomeIcon icon={faSignOutAlt}/>
                            Logout
                            </Link>
                        </>
                        :         
                        <Link to="/login" onClick={()=>setToggle(!toggle)} className='nav-link'>
                            <FontAwesomeIcon icon={faSignInAlt}/>
                            Login
                        </Link>
                        }
                    </div>
                    
                </div> 
            </>
        ) : (
            <>
                <div className='nav-items'>
                    <div className='nav-item'>
                        <div className='nav-link'>
                            <FcHome title='Home'/>
                        </div>
                        <div className='nav-link'>
                            <FcAbout title='About'/>
                        </div>
                        <div className='nav-link'>
                            <FcBriefcase title='Work'/>
                        </div>
                        <div className='nav-link'>
                            <FcParallelTasks title='Skills'/>
                        </div>
                        <div className='nav-link'>
                            <FcReading title='Education'/>
                        </div>
                        <div className='nav-link'>
                            <FcStackOfPhotos title='Projects'/>
                        </div>
                        <div className='nav-link'>
                            <FcBusinessContact title='Contact'/>
                        </div>
                    </div>
                </div>
            </>
        )  
        }
    </>
  )
}

export default Menus