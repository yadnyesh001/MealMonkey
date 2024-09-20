const mongoose = require ("mongoose");

const addressSchema = new mongoose.Schema({
    address:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    country:{
        type: String,
        required: true,
    },
    zipcode:{
        type: Number,
        required: true
    },
    contact:{
        type: Number,
        required: true
    }
})

mongoose.export = mongoose.model("Address", addressSchema);