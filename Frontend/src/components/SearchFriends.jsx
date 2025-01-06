import React, { useState } from "react";
import axios from "axios";
import '../styles/common.css'
import { Link } from "react-router-dom";

export function SearchFriends(){
    const [query,setQuery]=useState("");
    const [result,setResults]=useState([]);

    const handleSearch=async (e)=>{
        e.preventDefault();
        console.log('clicked')
        try {
            console.log('trying')
            const response=await axios.get(`https://friends2-backend.onrender.com/api/search?query=${query}`);
            console.log('free')
            console.log(query)
            setResults(response.data)
            console.log(result)
        } catch (error) {
            console.error("Error searching user:",error);
        }
    }

    return(
        <div>
            <h2>Search User</h2>
            <form onSubmit={handleSearch}>
                <input type="text" placeholder="Search User" value={query} onChange={(e)=>{setQuery(e.target.value)}}/>
                <button type="Submit">Search</button>
            </form> 
            <div>
                {result.length>0 ? (
                    <ul>
                        {result.map((item)=>{
                            return(<Link to={`/users/${item._id}` } key={item._id} ><li>{item.username}</li></Link>)
                        })}
                    </ul>
                ):(
                    <p>No Users Found</p>
                )}
            </div>
        </div>
    )
}
