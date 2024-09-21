const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    image: String,
   name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    foodType: {
        type: String,
        required: true
    },
    Discount:{
        type: Number
    },
})

module.exports = mongoose.model("Product", productSchema)