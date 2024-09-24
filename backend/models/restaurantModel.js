// models/Restaurant.js
const mongoose = require('mongoose');
const baseUser = require('./baseUserModel'); // Ensure the casing matches exactly

// Define Restaurant Schema
const restaurantSchema = new mongoose.Schema({
    hotelName: {
        type: String,
        required: true,
        trim: true
    },
    cuisines: [
        {
            type: String,
            required: true,
            trim: true
        }
    ],
    averageCost: {
        type: Number, // Changed to Number for better numerical operations
        required: true,
        min: 0
    },
    paymentMethods: {
        cash: {
            type: Boolean,
            default: true
        },
        cards: {
            type: Boolean,
            default: true
        },
        digitalPayments: {
            type: Boolean,
            default: true
        }
    },
    knownFor: [
        {
            type: String,
            required: true,
            trim: true
        }
    ],
    // More info: Available services
    moreInfo: {
        breakfast: { type: Boolean, default: false },
        takeaway: { type: Boolean, default: false },
        homeDelivery: { type: Boolean, default: false },
        valetParking: { type: Boolean, default: false },
        luxuryDining: { type: Boolean, default: false },
        tableBooking: { type: Boolean, default: false },
        brunch: { type: Boolean, default: false },
        buffet: { type: Boolean, default: false },
        indoorSeating: { type: Boolean, default: false },
        outdoorSeating: { type: Boolean, default: false }
    },
    // Restaurant type (pure veg, oriental, Indian, mixed, etc.)
    type: {
        type: String,
        enum: ['Pure Veg', 'Oriental', 'Indian', 'Mixed', 'Continental', 'Italian', 'Mexican', 'Fast Food'],
        required: true
    },
    // Photos for restaurant
    photos: [
        {
            type: String,
            required: false,
            trim: true
        }
    ],
    // Reference to the Review schema
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review'
        }
    ],
    // Restaurant rating (out of 5)
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    menu: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    ],
    // Operating hours
    timingFrom: {
        type: String,
        required: true,
        trim: true
    },
    timingTo: {
        type: String,
        required: true,
        trim: true
    },
    // Boolean to indicate if the restaurant is open
    isOpen: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// Create Restaurant Model using Discriminator(oop)
const Restaurant = baseUser.discriminator('Restaurant', restaurantSchema);

module.exports = Restaurant;
