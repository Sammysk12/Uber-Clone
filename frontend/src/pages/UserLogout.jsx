import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const UserLogout = () => {
  
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/logout`, {
        headers: {
            Authorization: `Bearer ${(token)}`
        }
    }).then((response) => {
        if(response.status === 200) {
            localStorage.removeItem("token");
            navigate("/login");
        }
    })
}, [token])

    return (
    


    <div>UserLogout</div>
  )
}

export default UserLogout