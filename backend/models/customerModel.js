const mongoose = require('mongoose');

const baseUser = require('./baseUserModel');
const customerSchema = new mongoose.Schema({
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
const Customer = baseUser.discriminator('Customer', customerSchema);

module.exports = Customer;
