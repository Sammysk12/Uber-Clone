//Importing express to create a server 
const express = require('express');

//created a server
const app = express();

//dotenv to access .env file
const dotenv = require('dotenv');


//cross origin server connect
const cors = require('cors');


//connectDb function imported to connect to the database
const connectDb = require('./configs/db.js');

//routes for routing on different api endpoints
const userRoutes = require('./routes/userRoutes.js')

//some inbuilt middlwares to parse the json data
app.use(express.json())
app.use(express.urlencoded({extended: true}));


connectDb();

dotenv.config();

app.use(cors());

//simple callback for server start message
app.get('/', (req,res)=>{
    res.send("Sever is running!");
});

app.use('/api/users', userRoutes)


module.exports = app;