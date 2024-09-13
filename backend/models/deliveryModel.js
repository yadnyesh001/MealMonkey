const mongoose = require("mongoose")

const deliverySchema = new mongoose.Schema({
    user:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    Name:{
        type:String,
        required:true
    },
    profilePic : Buffer,
    contact:{
        type:Number
    },
    license:{
        type:String,
        required:true
    },
    vehicleNumber:{
        type:String,
        required:true
    },
    isFree:{
        type:Boolean,
        default:false
    }
})

mongoose.exports = mongoose.model("Delivery", deliverySchema)