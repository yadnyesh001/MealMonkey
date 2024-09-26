const express = require("express");
const router = express.Router();
const restaurantController = require("../controllers/restaurantController");
const isLoggedIn = require("../middlewares/isLoggedIn");
const upload = require('../middlewares/multerConfig'); // Import multer config
const Auth = require("../middlewares/Auth")


//Restaurant dashboard
router.get("/",isLoggedIn, Auth.authorizeManager, restaurantController.getRestaurantDetails)
// Update restaurant profile
router.post("/profile", isLoggedIn, Auth.authorizeManager,upload.single('photos'), restaurantController.updateProfile);

// List menu items
router.get("/menu", isLoggedIn, restaurantController.listMenu);

// Add a new food item
router.post("/menu/item", isLoggedIn, Auth.authorizeManager, upload.single('image'), restaurantController.addItem);

// Update an existing food item
router.put("/menu/item/:itemId", isLoggedIn, restaurantController.updateItem);

// Delete a food item
router.delete("/menu/item/:itemId", isLoggedIn, restaurantController.deleteItem);

// Add discount to all food items
router.post("/menu/discount", isLoggedIn, restaurantController.addDiscountToAll);

// Get wallet amount
router.get("/wallet", isLoggedIn, restaurantController.getWallet);

// Add money to wallet
router.post("/wallet/add", isLoggedIn, restaurantController.addMoney);

// Update restaurant open status
router.post("/status/open", isLoggedIn, restaurantController.updateOpenStatus);

// View order queue
router.get("/orders/queue", isLoggedIn, restaurantController.viewOrderQueue);

// Reject an order
router.post("/orders/reject/:orderId", isLoggedIn, restaurantController.rejectOrder);

// Get order history
router.get("/orders/history", isLoggedIn, restaurantController.getOrderHistory);

// Get all reviews
router.get("/reviews", isLoggedIn, restaurantController.getAllReviews);

// Get daily analytics
router.get("/analytics/daily", isLoggedIn, restaurantController.getDailyAnalytics);
//Get all transactions of the restaurant
router.get("/transactions", isLoggedIn, restaurantController.getTransactions);

// Route to write a review
router.post("/writeReview", isLoggedIn, restaurantController.writeReview);

router.get("/getItem/:id", isLoggedIn, restaurantController.getMenuItemDetails);

router.put("/updateItem/:id", isLoggedIn, restaurantController.updateMenuItem);

module.exports = router;
