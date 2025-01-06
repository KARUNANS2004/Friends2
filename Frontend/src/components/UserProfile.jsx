import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export function UserProfile() {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                console.log(userId)
                const response = await axios.get(`http://localhost:5000/api/users/${userId}`);
                setUser(response.data);
            } catch (error) {
                setError("Error fetching user details.");
                console.error("Error fetching user details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [userId]);

    if (loading) {
        return <h1>Loading...</h1>;
    }

    if (error) {
        return <h1>{error}</h1>;
    }

    return (
        <div>
            <h2>Username: {user.username}</h2>
            <p>Friends Count: {user.friends.length}</p>
            {/* Additional user details can be displayed here */}
        </div>
    );
}
