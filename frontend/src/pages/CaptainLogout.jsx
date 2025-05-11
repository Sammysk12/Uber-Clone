import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CaptainLogout = () => {
  
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/captains/logout`, {
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
    


    <div>CaptainLogout</div>
  )
}

export default CaptainLogout