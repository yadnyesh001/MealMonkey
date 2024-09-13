const express = require("express");
const router = express.Router();
const { register, login, logout,
    profileDetailsUser, profileDetailsManager, profileDetailsDelivery,
    updateDetailsUser, updateDetailsManager, updateDetailsDelivery
 } = require("../controllers/indexController");
const isLoggedIn = require("../middlewares/isLoggedIn");

router.get("/", function(req, res) {
    res.send("Welcome to MealMonkey");
})

// Register Route
router.post("/register", register);

// Login & Logout Routes
router.post("/login", isLoggedIn, login);
router.get("/logout", logout);


// GET routes for profile details
router.get("/user/profileDetails", isLoggedIn, profileDetailsUser);
router.get("/manager/profileDetails", isLoggedIn, profileDetailsManager);
router.get("/delivery/profileDetails", isLoggedIn, profileDetailsDelivery);

// POST routes for updating profile details
router.post("/user/profileDetails", updateDetailsUser);
router.post("/manager/profileDetails", updateDetailsManager);
router.post("/delivery/profileDetails", updateDetailsDelivery);

module.exports = router;
