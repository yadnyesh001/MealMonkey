const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn");

router.get("/dashboard", isLoggedIn, (req, res) => {
    res.send("Admin Dashboard");
});

router.get("/Get Users", isLoggedIn, )


module.exports = router;
