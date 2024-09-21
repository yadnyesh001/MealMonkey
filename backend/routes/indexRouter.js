const express = require("express");
const router = express.Router();
const indexController = require("../controllers/indexController");
const isLoggedIn = require("../middlewares/isLoggedIn");


// Register Route
router.post("/register", indexController.register);

// Login & Logout Routes
router.post("/login", isLoggedIn, indexController.login);
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

module.exports = router;
