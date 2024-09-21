const express = require("express");
const router = express.Router();
const indexController = require("../controllers/indexController");
const isLoggedIn = require("../middlewares/isLoggedIn");

router.get("/", (req, res) => {
    res.send("Welcome to MealMonkey");
});

// Register Route
router.post("/register", indexController.register);

// Login & Logout Routes
router.post("/login", isLoggedIn, indexController.login);
router.get("/logout", indexController.logout);

// GET routes for profile details
router.get("/customer/profileDetails", isLoggedIn, indexController.profileDetailsCustomer);
router.get("/restaurant/profileDetails", isLoggedIn, indexController.profileDetailsRestaurant);
router.get("/deliveryPartner/profileDetails", isLoggedIn, indexController.profileDetailsDeliveryPartner);

// POST routes for updating profile details
router.post("/customer/profileDetails", indexController.updateDetailsCustomer);
router.post("/restaurant/profileDetails", indexController.updateDetailsRestaurant);
router.post("/deliveryPartner/profileDetails", indexController.updateDetailsDeliveryPartner);

module.exports = router;
