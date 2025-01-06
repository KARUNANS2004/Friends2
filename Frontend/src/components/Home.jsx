import React from "react";

export function Home({isLoggedIn, setIsLogged,username}){
    return(
        <div className="cont">
            <div className="user-detail-cont">
                <h1 className="username">{username}</h1>
            </div>
            <div className="friends-side">
                <h2>Friends</h2>
                <div className="friends-count"></div>
            </div>
        </div>
    )
}