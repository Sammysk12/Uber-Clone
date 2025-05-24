const { validationResult } = require("express-validator");
const Captain = require("../models/captain.js");

const createCaptain = require("../services/captainServices");const User = require("../models/user");
const BlacklistToken = require("../models/blacklistToken");



const registerCaptain =  async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }

    const {fullName, email, password, vehicle} = req.body;
    
    const isCaptainisUser = await User.findOne({email})
    if(isCaptainisUser){
        return res.status(400).json({message: 'This email registered to a user already!'})
    }
    
    const existingCaptain = await Captain.findOne({email});
    if(existingCaptain){
        return res.status(400).json({message: 'Captain already exists!'})
    }
    const hashedPassword = await Captain.hashPassword(password);

    console.log(hashedPassword);
    console.log({fullName, email, password, vehicle});

    const captain = await createCaptain({
        firstName: fullName.firstName,
        lastName : fullName.lastName,
        email,
        password : hashedPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity, 
        vehicleType: vehicle.vehicleType
    })

    console.log(captain);

    const token = captain.generateAuthToken();

    return res.status(201).json({captain: captain, token: token});

}



const loginCaptain = async (req, res) => {
    
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }
    const {email, password} = req.body;

    const captain = await Captain.findOne({email}).select('+password');
    if(!captain){
        return res.status(400).json({message: 'Invalid email or password!'})
    }

    const isMatch = await captain.comparePassword(password);
    if(!isMatch){
        return res.status(400).json({message: 'Invalid email or password!'})
    }   
    const token = captain.generateAuthToken();
    
    res.cookie('token', token,);

    return res.status(200).json({captain: captain, token: token});
}


const getCaptainProfile = async (req, res) => {
    return res.status(200).json({captain: req.captain});


}


const logoutCaptain = async (req, res) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    
    res.clearCookie('token');
   
    await BlacklistToken.create({ token });
    
    return res.status(200).json({ message: 'Logged out successfully!' });

}

module.exports = {
    registerCaptain, loginCaptain, getCaptainProfile, logoutCaptain
};