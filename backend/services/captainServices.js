const Captain = require("../models/captain");

const createCaptain = async ({ firstName, lastName, email, password, color, plate, capacity, vehicleType }) => {
    try {
        
        if(!firstName|| !email || !password || !color || !plate || !capacity || !vehicleType) {
           throw new Error("All fields are required" );
        };
        

        // Create a new captain
        const newCaptain = new Captain({
            fullName: {
                firstName,
                lastName,
            },
            email,
            password,
            vehicle :{
                color,
                plate,
                capacity,
                vehicleType,
            }
        });

        // Save the captain to the database
        await newCaptain.save();
        return newCaptain;
    
    } catch (error) {
        console.error(error);
    }
};


module.exports = createCaptain;