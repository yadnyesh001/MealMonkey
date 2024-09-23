const mongoose = require("mongoose");
const BaseUser = require('./baseUserModel'); // Adjust the path as necessary

// Define Delivery Partner Schema
const deliveryPartnerSchema = new mongoose.Schema({
    license: {
        type: String,
        required: true
    },
    vehicleNumber: {
        type: String,
        required: true
    },
    isFree: {
        type: Boolean,
        default: false
    },
    orderQueue: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order' 
        }
    ],

    deliveryHistory: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order' 
        }
    ],
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review' 
        }
    ],
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    wallet: {
        balance: {
            type: Number,
            default: 0,
            min: 0
        }
    }
}, {
    timestamps: true
});


// Create DeliveryPartner model using Discriminator(oop)
const DeliveryPartner = BaseUser.discriminator('DeliveryPartner', deliveryPartnerSchema);

module.exports = DeliveryPartner;
