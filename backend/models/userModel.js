const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
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
    },
    profilePic : Buffer,
    address:{
        type:String
    },
    contact:{
        type:Number
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        // enum: ["customer", "manager", "delivery"],
        required: true,
        default: "user"
    },
    cart:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Product"  
    }],
    orders:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Product"
    }],
    HotelName:{
        type:String,
    },
    bestSeller: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }],
    license:{
        type:String,
    },
    vehicleNumber:{
        type:String,
    },
    isFree:{
        type:Boolean,
        default:false
    }
})

module.exports = mongoose.model("User",userSchema);