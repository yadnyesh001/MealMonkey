const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    image: String,
    Name:{
        type: String,
        required: true
    },
    Price:{
        type: Number,
        required: true
    },
    Discount:{
        type: Number
    },
})

module.exports = mongoose.model("Product", productSchema)