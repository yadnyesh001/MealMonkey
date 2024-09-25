const userModel = require("../models/baseUserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET_KEY;
const validator = require('validator');
const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()]).{6,}$/;

function generateToken(user) {
    return jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
}

module.exports.register = async function(req, res) {
    try {
        let { name, email, password, role, isAdmin = false, contact, fullAddress, pincode } = req.body;
        
        // Validate input
        if (!name || !email || !password || !role || !contact || !fullAddress || !pincode) {
            return res.status(400).send("Please provide all details.");
        }
        // Checks if email is valid
        if (!validator.isEmail(email)) {
            return res.status(400).send("Please provide a valid email address.");
        }

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

        // Check if user already exists
        let user = await userModel.findOne({ email: email });
        if (user) return res.status(400).send("You already have an account. Please login.");
        // Hash the password
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(password, salt, async function(err, hash) {
                if (err) throw err;

                // Create new user
                let newUser = new userModel({
                name: name,
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
    } catch (err) {
        console.log(err);
        res.status(500).send("Error in registering user");
    }
};

module.exports.login = async function(req, res) {
    try {
        let { email, password } = req.body;

        let user = await userModel.findOne({ email: email });
        if (!user) {
            return res.status(400).send("Incorrect Username or Password.");
        }

        bcrypt.compare(password, user.password, function(err, result) {
            if (result) {
                let token = generateToken(user);
                res.cookie("token", token);
                res.status(200).json({
                    message: "Login successful",
                    role: user.role
                })
            } else {
                res.send("Incorrect Password.");
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

