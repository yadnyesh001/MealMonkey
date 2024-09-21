const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController");
const isLoggedIn = require("../middlewares/isLoggedIn");

router.get("/profileDetails", isLoggedIn, customerController.profileDetailsCustomer);
router.post("/profileDetails", customerController.updateDetailsCustomer);
// router.post("/address_update", Address_Update);


module.exports = router;
