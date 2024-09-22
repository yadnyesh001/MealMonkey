const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController");
const isLoggedIn = require("../middlewares/isLoggedIn");

router.get("/profileDetails", isLoggedIn, customerController.profileDetailsCustomer);
router.post("/profileDetails",isLoggedIn, customerController.updateDetailsCustomer);
router.get("/dashboard", isLoggedIn, function(req, res){
    res.send("Customer Dashboard");
})
// router.post("/address_update", Address_Update);


module.exports = router;
