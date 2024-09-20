const mongoose = require("mongoose")

const managerSchema = new mongoose.Schema({
    
    Name:{
        type:String,
        required:true
    },
    profilePic : Buffer,
    address:{
        type:String
    },
    contact:{
        type:Number
    },
    HotelName:{
        type:String,
        required:true
    },
    bestSeller: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }]
})

module.exports = mongoose.model("Manager",managerSchema);