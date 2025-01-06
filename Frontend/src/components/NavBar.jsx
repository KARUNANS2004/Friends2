import React from "react";
import { Link, Outlet } from "react-router-dom";
import '../styles/navbar-style.css'


export function NavBar({isLoggedIn}){
    return(
        <>
            <nav>
                <Link to="/" className="nav-bar">Home</Link>
                <div className="link-cont">
                    <Link to="/login" onClick={() => isLoggedIn && setIsLoggedIn(false)}>{!isLoggedIn ? 'Login' : 'Logout'}</Link>
                    <Link to="/search">Make Friends</Link>
                    <Link to="/authProfile">Profile</Link>
                    <Link to="/signup" >Signup</Link>
                </div>
            </nav>
            <Outlet/>
        </>
    )
}