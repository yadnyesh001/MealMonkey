const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const Auth = require("../middlewares/Auth");
const CRUD = require("../controllers/adminController");
router.get("/", isLoggedIn, (req, res) => {
    res.send("Admin Dashboard");
});

router.get("/getCustomers", isLoggedIn, Auth.authorizeAdmin, CRUD.getCustomers)
router.get("/getRestaurants", isLoggedIn, Auth.authorizeAdmin, CRUD.getRestaurants)
router.get("/getDeliveryPartner", isLoggedIn, Auth.authorizeAdmin, CRUD.getDeliveryPartner)
router.post("/getUser", isLoggedIn, Auth.authorizeAdmin, CRUD.getUser)
router.post("/deleteUser", isLoggedIn, Auth.authorizeAdmin, CRUD.deleteUser)
router.post("/changeUserRole", isLoggedIn, Auth.authorizeAdmin, CRUD.changeUserRole)

module.exports = router;
