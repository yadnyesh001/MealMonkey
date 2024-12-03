const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController");
const isLoggedIn = require("../middlewares/isLoggedIn");
const Auth = require("../middlewares/Auth")
const Restaurant = require("../models/restaurantModel")
const Product = require('../models/productModel');

// router.get("/profileDetails", isLoggedIn,  customerController.profileDetailsCustomer);
// router.post("/profileDetails",isLoggedIn, customerController.updateDetailsCustomer);
router.get("/", isLoggedIn, Auth.authorizeCustomer, function(req, res){
    res.status(200).send("Customer Dashboard");
})
// router.get('/categories/:foodType', isLoggedIn, Auth.authorizeCustomer, customerController.getCategories)
router.get("/popularRestaurants", customerController.getTopRestaurant)
// router.post("/address_update", Address_Update);
router.get("/restaurantDetails/:restaurantId", customerController.getRestaurant);
router.get('/menu/:restaurantId', customerController.listMenu);

router.get('/restaurants/by-food-type/:foodType', async (req, res) => {
    try {
        const { foodType } = req.params;

        // Find restaurants that have menu items of the specified food type
        const products = await Product.find({ foodType: foodType }).distinct('_id');
        const restaurants = await Restaurant.find({
            menu: { $in: products }
        }).populate('menu');

        res.status(200).json(restaurants);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching restaurants.");
    }
});


router.post("/cart/add", isLoggedIn, customerController.addToCart);

router.get('/cart', isLoggedIn, customerController.getCart); // Get cart items
router.put('/cart/:itemId', isLoggedIn, customerController.updateCartQuantity); // Update cart item quantity
router.post('/checkout', isLoggedIn, customerController.checkout); // Checkout
router.get('/wallet', isLoggedIn, customerController.getWalletBalance); // Update cart item quantity
router.post('/addMoney', isLoggedIn, customerController.addMoneyToWallet); // Checkout
router.get('/orders', isLoggedIn, Auth.authorizeCustomer, customerController.getOrders);


module.exports = router;
