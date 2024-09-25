const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    profilePhoto: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        fullAddress: {
            type: String, 
            required: false
        },
        pincode: {
            type: String, 
            required: false
        },
    },
    contact: {
        type: String,
        required: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    role: {
        type:String,
        default:"customer"
    },

    wishlist: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            default: []
        }
    ],
    savedAddresses:[
        {
          fullAddress:{
              type:String,
          },
          pincode:{
              type:String
          }
        }
    ],  
    favoriteRestaurants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Restaurant',
            default: []
        }
    ],
    orderHistory: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order'
        }
    ],
    wallet: {
        balance: {
            type: Number,
            default: 0,
            min: 0
        }
    },

    

}, {
    timestamps: true
});

// Create Customer Model using Discriminator(oop)
const Customer =mongoose.model('Customer', customerSchema);

module.exports = Customer;
