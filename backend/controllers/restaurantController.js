// controllers/restaurantController.js
const ADMIN_ID = 'yourAdminIdHere';
const BaseUser = require('../models/baseUserModel');
const Restaurant = require('../models/Restaurant');
const Transaction=require('../models/transactionModel')
const Order=require('../models/orderModel')
const Admin=require('../models/adminModel')
const Customer=require('../models/customerModel')
const Review = require('../models/Review');
// Update and transform baseUser to Restaurant
module.exports.updateProfile = async function(req, res) {
    try {
        const {
            hotelName,
            cuisines,
            averageCost,
            paymentMethods,
            knownFor,
            moreInfo,
            type,
            timingFrom,
            timingTo,
            photos
        } = req.body;

        // Validate input
        if (
            !hotelName ||
            !Array.isArray(cuisines) ||
            !averageCost ||
            !type ||
            !timingFrom ||
            !timingTo
        ) {
            return res.status(400).send("Please provide all necessary fields.");
        }

        // Find the baseUser
        let user = await BaseUser.findById(req.userId);

        if (!user) {
            return res.status(404).send("User not found.");
        }

        // Check if the user is already a Restaurant
        if (user.role !== 'Restaurant') {
            user.role = 'Restaurant';
        }

        // Add Restaurant-specific fields
        user.hotelName = hotelName;
        user.cuisines = cuisines;
        user.averageCost = averageCost;
        user.paymentMethods = paymentMethods || { cash: true, cards: true, digitalPayments: true };
        user.knownFor = knownFor || [];
        user.moreInfo = moreInfo || {};
        user.type = type;
        user.timingFrom = timingFrom;
        user.timingTo = timingTo;
        user.photos = photos || [];

        // Save the updated user as a Restaurant
        await user.save();

        res.status(200).json(user); // Send updated restaurant details
    } catch (err) {
        console.log(err);
        res.status(500).send("Error updating restaurant profile");
    }
};

// 1. List All Food Items
module.exports.listMenu = async function(req, res) {
    try {
        const restaurant = await Restaurant.findById(req.userId).populate('menu');
        if (!restaurant) {
            return res.status(404).send("Restaurant not found.");
        }
        res.status(200).json(restaurant.menu);
    } catch (err) {
        console.log(err);
        res.status(500).send("Error fetching menu.");
    }
};

// 2. Add a New Food Item
module.exports.addItem = async function(req, res) {
    try {
        const { image, name, price, foodType, discount } = req.body;

        // Validate input
        if (!name || !price || !foodType) {
            return res.status(400).send("Please provide name, price, and foodType.");
        }

        // Create new product
        const newProduct = new Product({
            image,
            name,
            price,
            foodType,
            discount,
            restaurant: req.userId
        });

        await newProduct.save();

        // Add product to restaurant's menu
        const restaurant = await Restaurant.findById(req.userId);
        restaurant.menu.push(newProduct._id);
        await restaurant.save();

        res.status(201).json(newProduct);
    } catch (err) {
        console.log(err);
        res.status(500).send("Error adding new item.");
    }
};

// 3. Update an Existing Food Item
module.exports.updateItem = async function(req, res) {
    try {
        const { itemId } = req.params;
        const { image, name, price, foodType, discount } = req.body;

        // Find the product and verify it belongs to the restaurant
        const product = await Product.findOne({ _id: itemId, restaurant: req.userId });
        if (!product) {
            return res.status(404).send("Product not found in your menu.");
        }

        // Update the product fields
        if (image !== undefined) product.image = image;
        if (name !== undefined) product.name = name;
        if (price !== undefined) product.price = price;
        if (foodType !== undefined) product.foodType = foodType;
        if (discount !== undefined) product.discount = discount;

        await product.save();

        res.status(200).json(product);
    } catch (err) {
        console.log(err);
        res.status(500).send("Error updating the item.");
    }
};

// 4. Delete a Food Item
module.exports.deleteItem = async function(req, res) {
    try {
        const { itemId } = req.params;

        // Find and delete the product if it belongs to the restaurant
        const product = await Product.findOneAndDelete({ _id: itemId, restaurant: req.userId });
        if (!product) {
            return res.status(404).send("Product not found in your menu.");
        }

        // Remove the product from the restaurant's menu
        const restaurant = await Restaurant.findById(req.userId);
        restaurant.menu.pull(itemId);
        await restaurant.save();

        res.status(200).send("Product deleted successfully.");
    } catch (err) {
        console.log(err);
        res.status(500).send("Error deleting the item.");
    }
};

// 5. Add Discount to All Food Items
module.exports.addDiscountToAll = async function(req, res) {
    try {
        const { discount } = req.body;

        // Validate discount
        if (discount === undefined || typeof discount !== 'number' || discount < 0 || discount > 100) {
            return res.status(400).send("Please provide a valid discount percentage (0-100).");
        }

        // Update all products in the restaurant's menu
        const result = await Product.updateMany(
            { restaurant: req.userId },
            { $set: { discount: discount } }
        );

        res.status(200).json({ message: `Discount of ${discount}% applied to all items.` });
    } catch (err) {
        console.log(err);
        res.status(500).send("Error applying discount to all items.");
    }
};


// 1. Get Wallet Amount
module.exports.getWallet = async function(req, res) {
    try {
        // Find the restaurant and select the wallet balance
        const restaurant = await Restaurant.findById(req.userId).select('wallet.balance');

        if (!restaurant) {
            return res.status(404).send("Restaurant not found.");
        }

        res.status(200).json({
            balance: restaurant.wallet.balance
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

        // Find the restaurant and update the wallet balance
        const restaurant = await Restaurant.findById(req.userId);

        if (!restaurant) {
            return res.status(404).send("Restaurant not found.");
        }

        restaurant.wallet.balance += amount;

        await restaurant.save();

        res.status(200).json({
            message: `Successfully added $${amount} to the wallet.`,
            newBalance: restaurant.wallet.balance
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error adding money to wallet.");
    }
};

// Update Restaurant Open Status
module.exports.updateOpenStatus = async function(req, res) {
    try {
        const { isOpen } = req.body; // Get the isOpen value from the request body

        // Validate input
        if (typeof isOpen !== 'boolean') {
            return res.status(400).send("Please provide a valid isOpen status (true or false).");
        }

        // Find the restaurant
        const restaurant = await Restaurant.findById(req.userId);
        if (!restaurant) {
            return res.status(404).send("Restaurant not found.");
        }

        // Update the isOpen status
        restaurant.isOpen = isOpen;
        await restaurant.save();

        res.status(200).json({
            message: `Restaurant is now ${isOpen ? 'open' : 'closed'}.`,
            isOpen: restaurant.isOpen
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating open status.");
    }
};


module.exports.viewOrderQueue = async function(req, res) {
    try {
        // Find the restaurant using the logged-in user's ID
        const restaurant = await Restaurant.findById(req.userId).populate('orderQueue');

        if (!restaurant) {
            return res.status(404).send("Restaurant not found.");
        }

        // Return the order queue
        res.status(200).json({
            orderQueue: restaurant.orderQueue
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching order queue.");
    }
};


// controllers/restaurantController.js



// Function to reject an order
module.exports.rejectOrder = async function(req, res) {
    try {
        const { orderId } = req.params; // Assume order ID is passed as a URL parameter

        // Find the restaurant and order
        const restaurant = await Restaurant.findById(req.userId);
        const order = await Order.findById(orderId).populate('customer');

        if (!restaurant || !order) {
            return res.status(404).send("Restaurant or order not found.");
        }

        // Update order status to rejected
        order.status = 'rejected';
        order.history.push(order._id); // Move order to history
        await order.save();

        // Calculate amounts
        const refundAmount = order.amount; // Total order amount
        const restaurantDeduction = refundAmount * 0.8; // 80% from restaurant
        const adminDeduction = refundAmount * 0.1; // 10% from admin
        const customerCredit = refundAmount * 0.1; // 10% credited to customer's wallet

        // Update restaurant wallet
        restaurant.wallet.balance -= restaurantDeduction;
        await restaurant.save();

        // Update customer wallet
        const customer = await Customer.findById(order.customer._id);
        customer.wallet.balance += customerCredit;
        await customer.save();
        
        const admin=await Admin.findById(ADMIN_ID);
        // Create transactions
        await Transaction.create([
            {
                amount: restaurantDeduction,
                from: { type: 'Restaurant', id: restaurant._id },
                to: { type: 'Customer', id: customer._id }, 
                isRefund: true
            },
            {
                amount: adminDeduction,
                from: { type: 'Admin', id: admin._Id },
                to: { type: 'Customer', id: customer._id },
                isRefund: true
            }
        ]);

        res.status(200).json({
            message: "Order rejected and amounts refunded.",
            order
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error rejecting the order.");
    }
};



//Controller to get order history
module.exports.getOrderHistory = async function(req, res) {
    try {
        // Find the restaurant by the user ID
        const restaurant = await Restaurant.findById(req.userId).populate('orderHistory');

        if (!restaurant) {
            return res.status(404).send("Restaurant not found.");
        }

        // Return the order history
        res.status(200).json(restaurant.orderHistory);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching order history.");
    }
};


//Controller to read the user reviews
// controllers/restaurantController.js

module.exports.getAllReviews = async function(req, res) {
    try {
        // Find the restaurant ID from the user's restaurant profile
        const restaurantId = req.userId; // Assuming req.userId is the restaurant's ID

        // Get all reviews targeting this restaurant
        const reviews = await Review.find({
            'target.restaurant': restaurantId
        }).populate('source.user', 'name') // Optionally populate the user details
          .select('reviewType rating comment createdAt likes dislikes');

        res.status(200).json(reviews);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching reviews.");
    }
};


module.exports.getDailyAnalytics = async function(req, res) {
    try {
        const restaurantId = req.userId; // Assuming req.userId is the restaurant's ID
        const today = new Date();
        const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

        // Total profit for the day
        const totalProfit = await Transaction.aggregate([
            { $match: { 'to.restaurant': restaurantId, createdAt: { $gte: startOfDay, $lt: endOfDay } } },
            { $group: { _id: null, total: { $sum: '$amount' } } }
        ]);

        // Daily average orders
        const dailyOrders = await Order.countDocuments({
            restaurant: restaurantId,
            createdAt: { $gte: startOfDay, $lt: endOfDay }
        });

        // Daily profit
        const dailyProfit = totalProfit.length ? totalProfit[0].total : 0;

        // Daily average rejected orders
        const dailyRejectedOrders = await Order.countDocuments({
            restaurant: restaurantId,
            status: 'rejected',
            createdAt: { $gte: startOfDay, $lt: endOfDay }
        });

        // Total ratings for the day
        const totalRatings = await Review.countDocuments({
            'target.restaurant': restaurantId,
            createdAt: { $gte: startOfDay, $lt: endOfDay }
        });

        // Constructing the analytics data
        const analytics = {
            totalProfit: dailyProfit,
            dailyAverageOrders: dailyOrders,
            dailyProfit,
            dailyAverageRejectedOrders: dailyRejectedOrders,
            totalRatings
        };

        res.status(200).json(analytics);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching daily analytics.");
    }
};


// Controller to get transactions related to the restaurant
module.exports.getTransactions = async function(req, res) {
    try {
        const restaurantId = req.userId; // Assuming req.userId is the restaurant's ID

        // Fetch transactions related to the restaurant
        const transactions = await Transaction.find({
            $or: [
                { 'from.id': restaurantId },
                { 'to.id': restaurantId }
            ]
        });

        res.status(200).json(transactions);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching transactions.");
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
        const validTargetTypes = [ 'DeliveryPartner', 'Admin'];
        if (!validTargetTypes.includes(targetType)) {
            return res.status(400).send("Invalid target type.");
        }

        // Check if the target exists
        let target;
        if (targetType === 'DeliveryPartner') {
            target = await DeliveryPartner.findById(targetId);
        } else if (targetType === 'Admin') {
            target = await Admin.findById(targetId);
        }

        if (!target) {
            return res.status(404).send(`${targetType} not found.`);
        }

        // Create the review
        const newReview = new Review({
            source: {
                restaurnat: req.userId, // Assuming req.userId is the ID of the user writing the review
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
