const mongoose = require("mongoose");

const dotenv = require('dotenv');
dotenv.config();

function connectDb() {
  mongoose
    .connect(
      process.env.MONGODB_URI)
      .then(() => {
        console.log("MongoDB Connected!");
      }).catch((err) => console.log(err));
}

module.exports = connectDb;
