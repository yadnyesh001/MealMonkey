// controllers/restaurantController.js
const ADMIN_ID = 'yourAdminIdHere';
const Restaurant = require('../models/restaurantModel');
const Transaction=require('../models/transactionModel')
const Order=require('../models/orderModel')
const Admin=require('../models/adminModel')
const Customer=require('../models/customerModel')
const Review = require('../models/reviewModel');
const DeliveryPartner=require('../models/deliveryPartnerModel')
module.exports.updateProfile = async function(req, res) {
    try {
        const { license, vehicleNumber, isFree } = req.body;

        // Validate input
        if (!license || !vehicleNumber) {
            return res.status(400).send("Please provide all necessary fields.");
        }

        // Find the baseUser
        let user = await DeliveryPartner.findById(req.userId);

        if (!user) {
            return res.status(404).send("User not found.");
        }

        // Check if the user is already a Delivery Partner
        if (user.role !== 'deliveryPartner') {
            user.role = 'deliveryPartner';
        }

        // Add Delivery Partner-specific fields
        user.license = license;
        user.vehicleNumber = vehicleNumber;
        user.isFree = isFree !== undefined ? isFree : user.isFree; // Retain current status if not provided

        // Save the updated user as a Delivery Partner
        await user.save();

        res.status(200).json(user); // Send updated delivery partner details
    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating delivery partner profile.");
    }
};


// 1. Get Wallet Amount
module.exports.getWallet = async function(req, res) {
    try {
        // Find the delivery partner and select the wallet balance
        const deliveryPartner = await DeliveryPartner.findById(req.userId).select('wallet.balance');

        if (!deliveryPartner) {
            return res.status(404).send("Delivery partner not found.");
        }

        res.status(200).json({
            balance: deliveryPartner.wallet.balance
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching wallet balance.");
    }
};

// 2. Add Money to Wallet
module.exports.addMoney = async function(req, res) {
    try {
        const { amount } = req.body;

        // Validate input
        if (amount === undefined || typeof amount !== 'number' || amount <= 0) {
            return res.status(400).send("Please provide a valid amount greater than 0.");
        }

        // Find the delivery partner and update the wallet balance
        const deliveryPartner = await DeliveryPartner.findById(req.userId);

        if (!deliveryPartner) {
            return res.status(404).send("Delivery partner not found.");
        }

        deliveryPartner.wallet.balance += amount;

        await deliveryPartner.save();

        res.status(200).json({
            message: `Successfully added $${amount} to the wallet.`,
            newBalance: deliveryPartner.wallet.balance
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error adding money to wallet.");
    }
};

// Get All Reviews for the Delivery Partner
module.exports.getAllReviews = async function(req, res) {
    try {
        // Find the delivery partner ID from the user's profile
        const deliveryPartnerId = req.userId; // Assuming req.userId is the delivery partner's ID

        // Get all reviews targeting this delivery partner
        const reviews = await Review.find({
            'target.deliveryPartner': deliveryPartnerId
        }).populate('source.user', 'username') // Optionally populate the user details
          .select('reviewType rating comment createdAt likes dislikes');

        res.status(200).json(reviews);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching reviews.");
    }
};


// Get Transactions for the Delivery Partner
module.exports.getTransactions = async function(req, res) {
    try {
        const deliveryPartnerId = req.userId; // Assuming req.userId is the delivery partner's ID

        // Fetch transactions where the delivery partner is involved
        const transactions = await Transaction.find({
            $or: [
                { 'from.deliveryPartner': deliveryPartnerId },
                { 'to.deliveryPartner': deliveryPartnerId }
            ]
        });

        res.status(200).json(transactions);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching transactions.");
    }
};


// Get Order History for the Delivery Partner
module.exports.getOrderHistory = async function(req, res) {
    try {
        const deliveryPartnerId = req.userId; // Assuming req.userId is the delivery partner's ID

        // Fetch the delivery partner and populate their delivery history
        const deliveryPartner = await DeliveryPartner.findById(deliveryPartnerId).populate('deliveryHistory');

        if (!deliveryPartner) {
            return res.status(404).send("Delivery partner not found.");
        }

        // Return the order history
        res.status(200).json(deliveryPartner.deliveryHistory);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching order history.");
    }
};

// Get Assigned Orders for the Delivery Partner
module.exports.getAssignedOrders = async function(req, res) {
    try {
        const deliveryPartnerId = req.userId; // Assuming req.userId is the delivery partner's ID

        // Fetch orders assigned to the delivery partner
        const assignedOrders = await Order.find({ deliveryPartner: deliveryPartnerId, status: 'pending' })
            .populate('restaurant'); // Optionally populate restaurant details

        res.status(200).json(assignedOrders);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching assigned orders.");
    }
};

// Accept an Order
module.exports.acceptOrder = async function(req, res) {
    try {
        const { orderId } = req.params; // Assume order ID is passed as a URL parameter

        // Find the order
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).send("Order not found.");
        }

        // Update order status and assign the delivery partner
        order.status = 'accepted';
        order.deliveryPartner = req.userId; // Assign the delivery partner

        // Find the delivery partner and update their orderQueue
        const deliveryPartner = await DeliveryPartner.findById(req.userId);
        if (!deliveryPartner) {
            return res.status(404).send("Delivery partner not found.");
        }

        // Push the order ID to the delivery partner's orderQueue
        deliveryPartner.orderQueue.push(orderId);
        
        await Promise.all([order.save(), deliveryPartner.save()]); // Save both changes

        res.status(200).json({
            message: "Order accepted successfully.",
            order
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error accepting the order.");
    }
};

// Reject an Order
module.exports.rejectOrder = async function(req, res) {
    try {
        const { orderId } = req.params; // Assume order ID is passed as a URL parameter

        // Find the order
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).send("Order not found.");
        }

        // Update order status to rejected
        order.status = 'delivery_rejected';
        await order.save();
        
        order.deliveryPartner = req.userId; // Assign the delivery partner

        // Find the delivery partner and update their orderQueue
        const deliveryPartner = await DeliveryPartner.findById(req.userId);
        if (!deliveryPartner) {
            return res.status(404).send("Delivery partner not found.");
        }
        deliveryPartner.deliveryHistory.push(orderId);


        res.status(200).json({
            message: "Order rejected successfully.",
            order
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error rejecting the order.");
    }
};


// controllers/deliveryPartnerController.js

module.exports.viewOrderQueue = async function(req, res) {
    try {
        // Find the delivery partner using the logged-in user's ID
        const deliveryPartner = await DeliveryPartner.findById(req.userId).populate('orderQueue');

        if (!deliveryPartner) {
            return res.status(404).send("Delivery Partner not found.");
        }

        // Return the order queue
        res.status(200).json({
            orderQueue: deliveryPartner.orderQueue
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching order queue.");
    }
};


// controllers/deliveryPartnerController.js

module.exports.completeOrder = async function(req, res) {
    try {
        const { orderId } = req.params; // Assume order ID is passed as a URL parameter

        // Find the order and associated delivery partner
        const order = await Order.findById(orderId).populate('restaurant customer');
        const deliveryPartner = await DeliveryPartner.findById(req.userId);

        if (!order || !deliveryPartner) {
            return res.status(404).send("Order or delivery partner not found.");
        }

        // Change the order status to completed
        order.status = 'Completed';

        // Remove from order queue and add to delivery history
        deliveryPartner.orderQueue.pull(orderId);
        deliveryPartner.deliveryHistory.push(orderId);
        await deliveryPartner.save();

        // Remove from restaurant's order queue and push to order history
        const restaurant = order.restaurant;
        restaurant.orderQueue.pull(orderId);
        restaurant.orderHistory.push(orderId);
        await restaurant.save();

        // Create a transaction for 10% of the order amount
        const transactionAmount = order.amount * 0.1; // 10% of the order amount
        deliveryPartner.wallet.balance += transactionAmount;
        await deliveryPartner.save();

        await Transaction.create({
            amount: transactionAmount,
            from: { type: 'Customer', id: order.customer._id },
            to: { type: 'DeliveryPartner', id: deliveryPartner._id },
            isRefund: false
        });

        await order.save(); // Save the updated order

        res.status(200).json({
            message: "Order completed successfully.",
            order
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error completing the order.");
    }
};


// controllers/deliveryPartnerController.js

module.exports.getDailyAnalytics = async function(req, res) {
    try {
        const deliveryPartnerId = req.userId; // Assuming req.userId is the delivery partner's ID
        const today = new Date();
        const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

        // Total earnings for the day (10% of completed order amounts)
        const totalEarnings = await Transaction.aggregate([
            { $match: { 'to.id': deliveryPartnerId, createdAt: { $gte: startOfDay, $lt: endOfDay } } },
            { $group: { _id: null, total: { $sum: '$amount' } } }
        ]);

        // Average completed orders
        const completedOrdersCount = await Order.countDocuments({
            deliveryPartner: deliveryPartnerId,
            status: 'Completed',
            createdAt: { $gte: startOfDay, $lt: endOfDay }
        });

        // Total ratings and average ratings calculation
        const ratingData = await Review.aggregate([
            { $match: { 'target.deliveryPartner': deliveryPartnerId } },
            { $group: { _id: null, averageRating: { $avg: '$rating' } } }
        ]);

        const averageRating = ratingData.length ? ratingData[0].averageRating.toFixed(1) : 0; // Round to 1 decimal place

        // Constructing the analytics data
        const analytics = {
            totalEarnings: totalEarnings.length ? totalEarnings[0].total : 0,
            averageCompletedOrders: completedOrdersCount,
            averageRating: parseFloat(averageRating) // Ensure it's a float
        };

        res.status(200).json(analytics);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching daily analytics.");
    }
};

module.exports.writeReview = async function(req, res) {
    try {
        const { targetType, targetId, reviewType, rating, comment } = req.body;

        // Validate input
        if (!targetType || !targetId || !reviewType || rating === undefined || !comment) {
            return res.status(400).send("Please provide all necessary fields.");
        }

        // Ensure targetType is valid
        const validTargetTypes = ['Restaurant', 'Customer'];
        if (!validTargetTypes.includes(targetType)) {
            return res.status(400).send("Invalid target type.");
        }

        // Check if the target exists
        let target;
        if (targetType === 'Restaurant') {
            target = await Restaurant.findById(targetId);
        } else if (targetType === 'Customer') {
            target = await Customer.findById(targetId);
        }

        if (!target) {
            return res.status(404).send(`${targetType} not found.`);
        }

        // Create the review
        const newReview = new Review({
            source: {
                deliveryPartner: req.userId, // Assuming req.userId is the ID of the user writing the review
            },
            target: {
                [targetType.toLowerCase()]: targetId, // Dynamically set the target type
            },
            reviewType,
            rating,
            comment
        });

        await newReview.save();
        res.status(201).json(newReview);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error writing review.");
    }
};
