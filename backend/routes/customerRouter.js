// const express = require("express");
// const router = express.Router();
// const { registerUser, loginUser, logoutUser, profileDetails, updateProfileDetails } = require("../controllers/userController");

// // Register Route
// router.post("/register", registerUser);

// // Profile Details Routes
// router.get("/profileDetails", profileDetails);  // Show profile form
// router.post("/profileDetails", updateProfileDetails);  // Submit profile form

// // Login & Logout Routes
// router.post("/login", loginUser);
// router.get("/logout", logoutUser);

// module.exports = router;


// const address = require("../models/address");
// const { Address_Update } = require("../controllers/userController");

const express = require("express");
const router = express.Router();

router.get("/dashboard", function(req, res) {
    res.send("Welcome to User Dashboard");
})
// router.post("/address_update", Address_Update);


module.exports = router;
