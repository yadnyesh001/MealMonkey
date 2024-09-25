const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController");
const isLoggedIn = require("../middlewares/isLoggedIn");
const Auth = require("../middlewares/Auth")


// router.get("/profileDetails", isLoggedIn,  customerController.profileDetailsCustomer);
// router.post("/profileDetails",isLoggedIn, customerController.updateDetailsCustomer);
router.get("/dashboard", isLoggedIn, Auth.authorizeCustomer, function(req, res){
    res.send("Customer Dashboard");
})

router.get("/popularRestaurants", isLoggedIn, Auth.authorizeCustomer, customerController.getTopRestaurant)
// router.post("/address_update", Address_Update);


module.exports = router;
