

const customerSchema = new Schema({
    // Wishlist: Array of Product references
    wishlist: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            default: []
        }
    ],

    // Saved Addresses: Array of address subdocuments
    savedAddresses:[
      {
        fullAddress:{
            type:String,
        },
        pinCode:{
            type:String
        }
      }
    
],
    // Favorite Restaurants: Array of Restaurant references
    favoriteRestaurants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Restaurant',
            default: []
        }
    ],

    // Cart: Array of cart item subdocuments
    cart: [
        cartItemSchema
    ],

    // Order History: Array of Order references
    orderHistory: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order'
        }
    ],

    // Payment Methods: Array of payment method subdocuments
    paymentMethods: [
        paymentMethodSchema
    ],

    // Loyalty Points: Number indicating accumulated points
    loyaltyPoints: {
        type: Number,
        default: 0,
        min: 0
    },

    // Notification Preferences: Object containing notification settings
    notifications: notificationSchema
}, {
    timestamps: true
});

// Create Customer Model using Discriminator(oop)
const Customer = BaseUser.discriminator('Customer', customerSchema);

module.exports = Customer;