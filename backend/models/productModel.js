const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    image:{
        type: String
    },
   name: {
        type: String,
        
    },
    price: {
        type: Number,
        
    },
    foodType: {
        type: String,
        
    },
    Discount:{
        type: Number
    },
})

module.exports = mongoose.model("Product", productSchema)