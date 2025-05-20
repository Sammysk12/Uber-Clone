import axios from 'axios';
import React, { useEffect } from 'react'
import { useContext } from 'react';
import { useState } from 'react';

import { useNavigate } from 'react-router-dom'
import { UsersDataContext } from '../context/UsersContext';

const UserProtectedWrapper = ({children
    
}) => {

    const token = localStorage.getItem("token");
    
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const {user, setUser} = useContext(UsersDataContext);


    useEffect(() => {
    if(!token) {
        navigate("/login");
    }
    

    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/profile`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((response) => {
        if(response.status === 200){
            const data = response.data;
            setUser(data.user);
            setIsLoading(false);
        }
    }).catch((error) => {
        console.log(error);
        localStorage.removeItem("token");
        navigate("/login");
    })
    },[token])



    if(isLoading){
        return <div>Loading...</div>
    }


  return (
    <>
    {children}
    </>
  )
}

export default UserProtectedWrapper
