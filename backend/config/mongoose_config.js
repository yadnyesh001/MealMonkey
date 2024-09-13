const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const MONGO_URL = process.env.MONGO_URL;
mongoose.connect(`${MONGO_URL}`)
.then(() => {
    console.log("Connected to MongoDB");
})
.catch((err) =>{
    console.log(err + ": Could not connect to MongoDB");
})


module.exports = mongoose.connection;