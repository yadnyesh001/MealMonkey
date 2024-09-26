const customer = require("../models/customerModel");
const restaurant = require("../models/restaurantModel");
const deliveryPartner = require("../models/deliveryPartnerModel");
const bcrypt = require("bcrypt");
const isLoggedIn=require('../middlewares/isLoggedIn')
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET_KEY;
const validator = require('validator');
const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()]).{6,}$/;
const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
function generateToken(user) {
    return jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
}

module.exports.register = async function(req, res) {
    try {
        let { username, email, password, role, isAdmin = false, contact, fullAddress, pincode } = req.body;
        
        // Validate input
        if (!username || !email || !password || !role || !contact || !fullAddress || !pincode) {
            return res.status(400).send("Please provide all details.");
        }
        // Checks if email is valid
        if (!validator.isEmail(email)) {
            return res.status(400).send("Please provide a valid email address.");
        }

        if (!emailRegex.test(email)) {
            return res.status(400).send(`Provide valid email address`);
        }
        email = email.toLowerCase();
        // Checks if password is valid
        if (!passwordRegex.test(password)) {
            return res.status(400).send(`
            Password must meet the following criteria:\n
            • At least 6 characters long\n
            • At least one uppercase letter
            • At least one lowercase letter 
            • At least one number
            • At least one special character (!@#$%^&*())
            `);
        }
        let user1 = await deliveryPartner.findOne({ email: email });
        let user2 = await restaurant.findOne({ email: email });
        let user3 = await customer.findOne({ email: email });
        if (user1 || user2 || user3) return res.status(400).send("You already have an account. Please login.");
        
        if(role==="customer" || role==="admin"){
            // Hash the password
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(password, salt, async function(err, hash) {
                    if (err) throw err;
    
                    // Create new user
                    let newUser = new customer({
                    username: username,
                    email: email,
                    password: hash,
                    role: role,
                    isAdmin: isAdmin,
                    contact: contact,
                    address: {
                        fullAddress: fullAddress,
                        pincode: pincode
                    }
                    });
    
                    const savedUser =await newUser.save();
                    res.status(201).json({
                        success: true,
                        message: "User registered successfully",
                        user: savedUser
                    });
                });
            });
        }
        else if(role==="restaurant"){
            // Hash the password
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(password, salt, async function(err, hash) {
                    if (err) throw err;
    
                    // Create new user
                    let newUser = new restaurant({
                    username: username,
                    email: email,
                    password: hash,
                    role: role,
                    isAdmin: isAdmin,
                    contact: contact,
                    address: {
                        fullAddress: fullAddress,
                        pincode: pincode
                    },
                    });
    
                    const savedUser =await newUser.save();
                    res.status(201).json({
                        success: true,
                        message: "User registered successfully",
                        user: savedUser
                    });
                });
            });
        }else if(role==="deliveryPartner"){
            
            // Hash the password
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(password, salt, async function(err, hash) {
                    if (err) throw err;
    
                    // Create new user
                    let newUser = new deliveryPartner({
                    username: username,
                    email: email,
                    password: hash,
                    role: role,
                    isAdmin: isAdmin,
                    contact: contact,
                    address: {
                        fullAddress: fullAddress,
                        pincode: pincode
                    }
                    });
    
                    const savedUser =await newUser.save();
                    res.status(201).json({
                        success: true,
                        message: "User registered successfully",
                        user: savedUser
                    });
                });
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("Error in registering user");
    }
};

module.exports.login = async function(req, res) {
    try {
        let { email, password } = req.body;
        
        // First check in customer, then deliveryPartner, and lastly restaurant
        let user = await customer.findOne({ email: email }) ||
                   await deliveryPartner.findOne({ email: email }) ||
                   await restaurant.findOne({ email: email });

        // If no user is found, return the incorrect credentials message
        if (!user) {
            return res.status(400).send("Incorrect Username or Password.");
        }

        
        bcrypt.compare(password, user.password, function(err, result) {
            if (result) {
                let token = generateToken(user);
                res.cookie("token", token);
                res.cookie("role", user.role);
                res.status(200).json({
                    message: "Login successful",
                    role: user.role
                })
            } else {
                res.status(400).send("Incorrect Password.");
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).send("Error during login");
    }
};

module.exports.logout = function(req, res) {
    res.clearCookie("token");
    res.redirect(303,"/");
};

