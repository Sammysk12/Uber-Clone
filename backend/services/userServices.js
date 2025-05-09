
//Helper funtion to create a register a user in the database
const User = require('../models/user.js')

const createUser = async({firstName, lastName, email, password}) =>{


    if(!firstName || !email || !password){
        throw new Error("All fields are required!");
    }

    const user = User.create({
        fullName : {
            firstName,
            lastName,
        }, 
        email,
        password,
    })

    return user;
    
} 

module.exports ={
    createUser
}