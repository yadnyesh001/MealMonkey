const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController");
const isLoggedIn = require("../middlewares/isLoggedIn");
const Auth = require("../middlewares/Auth")


// router.get("/profileDetails", isLoggedIn,  customerController.profileDetailsCustomer);
// router.post("/profileDetails",isLoggedIn, customerController.updateDetailsCustomer);
router.get("/", isLoggedIn, Auth.authorizeCustomer, function(req, res){
    res.status(200).send("Customer Dashboard");
})

router.get("/popularRestaurants", isLoggedIn, Auth.authorizeCustomer, customerController.getTopRestaurant)
// router.post("/address_update", Address_Update);

router.get('/menu/:restaurantId', customerController.listMenu);


router.post("/cart/add", isLoggedIn, customerController.addToCart);

router.get('/cart', isLoggedIn, customerController.getCart); // Get cart items
router.put('/cart/:itemId', isLoggedIn, customerController.updateCartQuantity); // Update cart item quantity
router.post('/checkout', isLoggedIn, customerController.checkout); // Checkout



module.exports = router;
