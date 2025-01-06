import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/common.css"
import axios from "axios";

export function Login({isLoggedIn, setIsLoggedIn,setUsername}){

    const [formData,setFormData]=useState({username:"",password:""});
    const [errorMessage,setErrorMessage]=useState("");

    const navigate=useNavigate();

    const handleChange=(e)=>{
        const {name,value}=e.target;
        setFormData({...formData,[name]:value})
    }

    const handleLogin=async (e)=>{
        e.preventDefault();
        const username=formData.username;
        try {
            const response=await axios.post("http://localhost:5000/api/auth/login",formData);
            localStorage.setItem("token",response.data.token)
            console.log('Successful login') 
            setUsername(username)  
            setIsLoggedIn(true)
            navigate("/")         
        } catch (error) {
            console.error(error)
            setErrorMessage(error.response?.data?.message || 'An error occurred during login');
            setIsLoggedIn(false)
        }
    }

    return (
        (!isLoggedIn ? (
            <div>
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                  <div>
                    <label>Username:</label>
                    <input type="text" name="username" value={formData.username} onChange={handleChange} required placeholder="username" />
                  </div>
                  <div>
                    <label>Password:</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required placeholder="password" />
                  </div>
                  {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
                  <button type="submit">Login</button>
                </form>
            </div>
        ):(
            <div>
                <h1>Already logged In</h1>
                <h4>Go to <span><Link to="/">Home</Link></span></h4>
            </div>
        ))
      );
}