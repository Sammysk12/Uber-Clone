const { validationResult } = require("express-validator");
const Captain = require("../models/captain");

const createCaptain = require("../services/captainServices");const User = require("../models/user");



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

    const token = captain.generateAuthToken();

    return res.status(201).json({captain: captain, token: token});

}

module.exports = {
    registerCaptain,
};