const express = require("express");
const router = express.Router();
const indexController = require("../controllers/indexController");
const isLoggedIn = require("../middlewares/isLoggedIn");
const Customer=require("../models/customerModel")
const Restaurant=require("../models/restaurantModel")
const DeliveryPartner=require("../models/deliveryPartnerModel")
router.get("/", function(req, res){
    res.send("Home Page");
});
// Register Route
router.post("/register", indexController.register);

// Login & Logout Routes
router.post("/login", indexController.login);
router.get("/logout", indexController.logout);

// GET routes for profile details

// router.get("/restaurant/profileDetails", isLoggedIn, indexController.profileDetailsRestaurant);
// router.get("/deliveryPartner/profileDetails", isLoggedIn, indexController.profileDetailsDeliveryPartner);

// POST routes for updating profile details

// router.post("/restaurant/profileDetails", indexController.updateDetailsRestaurant);
// router.post("/deliveryPartner/profileDetails", indexController.updateDetailsDeliveryPartner);

router.get("/admin/dashboard", isLoggedIn, (req, res) => {
    res.send("Admin Dashboard");
});

router.get('/get_user', isLoggedIn, async (req, res) => {
    try {
        const userId = req.userId;
        let user = await Customer.findById(userId) ||
                   await DeliveryPartner.findById(userId) ||
                   await Restaurant.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user); 
    } catch (error) {
        console.error('Error fetching user:', error); // Log the error for debugging
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;
