// const UserModel = require ("../models/baseUserModel");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET_KEY;


module.exports = function(req, res, next) {
    const token = req.cookies.token; // Adjust the cookie name as needed
    if (!token) return res.status(401).send("Access denied.");

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.userId = decoded.id; // Store the user ID in the request object
        next();
    } catch (err) {
        res.status(400).send(err);
    }
};
