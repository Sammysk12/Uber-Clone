const User = require('../models/user');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
const BlacklistToken = require('../models/blacklistToken');



const authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized!' });
    }

    const blacklistedToken = await BlacklistToken.findOne({ token });
    if (blacklistedToken) {
        return res.status(401).json({ message: 'Unauthorized!' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded._id);
        req.user = user;
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized!' });
        }


        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized!' });
    }

}


module.exports = authUser;