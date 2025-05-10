const User = require('../models/user');

const BlacklistToken = require('../models/blacklistToken.js')

//Helper function imported to create user
const {createUser} = require('../services/userServices.js')

const {validationResult} = require('express-validator')

const registerUser = async(req, res, next) => {
    

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }

    const {fullName, email, password} = req.body;
    
    const existingUser = await User.findOne({email});
    if(existingUser){
        return res.status(400).json({message: 'User already exists!'})
    }

    const hashedPassword = await User.hashPassword(password);

    const user = await createUser({
        firstName: fullName.firstName,
        lastName : fullName.lastName,
        email,
        password : hashedPassword,
    })

    const token = user.generateAuthToken();

    return res.status(201).json({user: user, token: token});

} 


const loginUser = async(req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }

    const {email, password} = req.body;

    const user = await User.findOne({email}).select('+password');
    if(!user){
        return res.status(401).json({message: 'Invalid email or password'})
    }

    const isMatch = await user.comparePassword(password);
    if(!isMatch){
        return res.status(401).json({message: 'Invalid email or password'})
    }

    const token = user.generateAuthToken();

    res.cookie('token', token);

    return res.status(200).json({user: user, token: token});
}

const getUserProfile = async(req, res, next) => {

    return res.status(200).json({user: req.user});
}


const logoutUser = async(req, res, next) => {
    res.clearCookie('token');
    const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];

    await BlacklistToken.create({token});
    return res.status(200).json({message: 'Logged out successfully'});
}



module.exports = {
    registerUser, loginUser, getUserProfile, logoutUser
}