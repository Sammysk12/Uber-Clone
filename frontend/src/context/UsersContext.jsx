import React, {createContext, useState} from 'react'

export const UsersDataContext = createContext();


const UsersContext = ({children}) => {
    //to hold the user data
    const [user, setUser] = useState({
          email: "",
          password: "",
          fullName: {
              firstName: "",
              lastName: ""
          }
      })
        
        
        
 const value = {user}
  return (
    <UsersDataContext.Provider value={{value}}>
      {children}
    </UsersDataContext.Provider>
  )
}

export default UsersContext