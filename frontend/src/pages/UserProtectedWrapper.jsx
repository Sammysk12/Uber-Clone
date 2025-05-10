import React, { useEffect } from 'react'

import { useContext } from 'react'
import { UsersDataContext } from '../context/UsersContext'
import { useNavigate } from 'react-router-dom'

const UserProtectedWrapper = ({children
    
}) => {

    const token = localStorage.getItem("token");
    
    const navigate = useNavigate();


    useEffect(() => {
    if(!token) {
        navigate("/login");
    }
    },[token])
  return (
    <>
    {children}
    </>
  )
}

export default UserProtectedWrapper
