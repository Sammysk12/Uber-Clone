//Importing express to create a server 
const express = require('express');

//created a server
const app = express();

//dotenv to access .env file
const dotenv = require('dotenv');


//cross origin server connect
const cors = require('cors');

//importing to parse the cookies from the request
const cookieParser = require('cookie-parser');


//connectDb function imported to connect to the database
const connectDb = require('./configs/db.js');

//routes for routing on different api endpoints
const userRoutes = require('./routes/userRoutes.js')
const captainRoutes = require('./routes/captainRoutes.js')

//some inbuilt middlwares to parse the json data
app.use(express.json())
app.use(express.urlencoded({extended: true}));


connectDb();

dotenv.config();

app.use(cors());
app.use(cookieParser());

//simple callback for server start message
app.get('/', (req,res)=>{
    res.send("Sever is running!");
});

//Routing the api endpoints to the respective routes
app.use('/api/users', userRoutes);

app.use('/api/captains', captainRoutes);

module.exports = app;