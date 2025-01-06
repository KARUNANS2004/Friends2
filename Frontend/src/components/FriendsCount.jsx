import React, { useState, useEffect } from "react";
import axios from "axios";

const FriendsCount = ({ userId }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchFriendsCount = async () => {
      try {
        const response = await axios.get(`https://friends2-backend.onrender.com/api/friends/count/${userId}`);
        setCount(response.data.friendsCount);
      } catch (error) {
        console.error("Error fetching friends count:", error);
      }
    };

    fetchFriendsCount();
  }, [userId]);

  return <div>Friends Count: {count}</div>;
};

export default FriendsCount;
