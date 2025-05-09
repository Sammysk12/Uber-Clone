const mongoose = require('mongoose')

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const captainSchema = new mongoose.Schema({
    fullName: {
        firstName : {
            type: String,
            required: true,
            minLength : [3, "First name must be at least 3 characters"],
        },
        lastName : {
            type: String,
            minLength : [3, "First name must be at least 3 characters"],
        },
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+|.S+S/, "Please enter a valid email address"],
    },
    password: {
        type: String,
        required: true,
        minLength: [6, "Password must be at least 6 characters"],
    },
    socketID: {
        type: String,
    },

    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "inactive",
    },

    vehicle: {
        color: {
        type:String,
        required: true,
        minLength: [3, "Color must be at least 3 characters"],
        },  

        plate: {
            type: String,
            required: true,
            minLength: [3, "Plate must be at least 3 characters"],
        },

        capacity: {
            type: Number,
            required: true,
            min: [1, "Capacity must be at least 1"],
        },

        vehicleType : {
            type: String,
            enum: ["car", "bike", "auto"],
            required: true,
        },
    },

    location: {
        lat: {
            type: Number,
            
        },
        long: {
            type: Number,
        },
    },


});

captainSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });   
    return token;
}


captainSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
    
}

captainSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}

const Captain = mongoose.model("Captain", captainSchema);

module.exports = Captain;