import React, { useEffect } from 'react'

import { useNavigate } from 'react-router-dom'
import { CaptainsDataContext } from '../context/CaptainsContext';
import { useContext } from 'react';
import axios from 'axios';
import { useState } from 'react';

const CaptainProtectedWrapper = ({children
    
}) => {

    const token = localStorage.getItem("token");
    
    const navigate = useNavigate();
    const {captain, setCaptain} = useContext(CaptainsDataContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
    if(!token) {
        navigate("/captain-login");
    }
    },[token])

    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/captains/profile`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((response) => {
        if(response.status === 200){
            const data = response.data;
            setCaptain(data.captain);
            setIsLoading(false);
        }
    }).catch((error) => {
        console.log(error);
        localStorage.removeItem("token");
        navigate("/captain-login");
    })


    if(isLoading){
        return <div>Loading...</div>
    }   


  return (
    <>
    {children}
    </>
  )
}

export default CaptainProtectedWrapper