const User = require('../models/user');


//Helper function imported to create user
const {createUser} = require('../services/userServices.js')

const {validationResult} = require('express-validator')

const registerUser = async(req, res, next) => {
    

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }

    const {fullName, email, password} = req.body;

    console.log({fullName, email, password})
    const hashedPassword = await User.hashPassword(password);

    const user = await createUser({
        firstName: fullName.firstName,
        lastName : fullName.lastName,
        email,
        password : hashedPassword,
    })

    const token = User.generateAuthToken();

    return res.status(201).json({user: user, token: token});

} 

module.exports = {
    registerUser
}