const userModel = require("../models/userModel");
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
        let { username, email, password, role, isAdmin} = req.body;

        // Validate input
        if (!username || !email || !password || !role) {
            return res.status(400).send("Please provide all details, including role.");
        }

        // Checks if email is valid or not
        if(!validator.isEmail(email)){
            return res.status(400).send("Please provide a valid email address.");
        }

        // Checks if password is valid or not
        if(!passwordRegex.test(password)){
            return res.status(400).send(`
      Password must meet the following criteria:
      • At least 6 characters long
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
                    user: username,
                    email: email,
                    password: hash,
                    role: role,
                    isAdmin: isAdmin,
                });

                await newUser.save();

                // Generate token and set cookies
                let token = generateToken(newUser);
                res.cookie("token", token);
                res.cookie("email", email);

                if(isAdmin === true){
                    res.redirect("/admin/dashboard");
                }
                // Redirect based on selected role
                if (role === "user") {
                    res.redirect("/user/profileDetails");
                } else if (role === "manager") {
                    res.redirect("/manager/profileDetails");
                } else if (role === "delivery") {
                    res.redirect("/delivery/profileDetails");
                }
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

                // Check if the user has filled in the "Name" field
                if (!user.name || user.Name.trim() === "") {
                    // Redirect to the profile details page based on role if name is missing
                    if (user.role === "user") {
                        res.redirect("/user/profileDetails");
                    } else if (user.role === "manager") {
                        res.redirect("/manager/profileDetails");
                    } else if (user.role === "delivery") {
                        res.redirect("/delivery/profileDetails");
                    }
                } else {
                    // Redirect to the dashboard based on role if name is filled
                    if (user.role === "user") {
                        res.redirect("/user/dashboard");
                    } else if (user.role === "manager") {
                        res.redirect("/manager/dashboard");
                    } else if (user.role === "delivery") {
                        res.redirect("/delivery/dashboard");
                    }
                }
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
    res.clearCookie("email");
    res.redirect("/");
};




// Render profile form for User (Customer) - GET
module.exports.profileDetailsUser = async function(req, res) {
    let email = req.cookies.email;
    let user = await userModel.findOne({ email: email });
    if (!user) return res.redirect("/");

    // Render the profile details form for the user
    res.render("profileDetailsUser", { user });
};

// Render profile form for Manager - GET
module.exports.profileDetailsManager = async function(req, res) {
    let email = req.cookies.email;
    let user = await userModel.findOne({ email: email });
    if (!user) return res.redirect("/");

    // Render the profile details form for the manager
    res.render("profileDetailsManager", { user });
};

// Render profile form for Delivery - GET
module.exports.profileDetailsDelivery = async function(req, res) {
    let email = req.cookies.email;
    let user = await userModel.findOne({ email: email });
    if (!user) return res.redirect("/");

    // Render the profile details form for the delivery person
    res.render("profileDetailsDelivery", { user });
};

// Update profile details for User (Customer) - POST
module.exports.updateDetailsUser = async function(req, res) {
    try {
        let email = req.cookies.email;
        let { Name, address, contact } = req.body;
        
        if(!Name || !address || !contact ){
            return res.status(400).send("Please fill in all the fields.");
        }
        // Find the user and update their profile details
        let user = await userModel.findOneAndUpdate(
            { email: email },
            { Name: Name, address: address, contact: contact },
            { new: true }
        );

        // Redirect to the user (customer) dashboard
        res.redirect("/user/dashboard");
    } catch (err) {
        console.log(err);
        res.status(500).send("Error updating user profile");
    }
};

// Update profile details for Manager - POST
module.exports.updateDetailsManager = async function(req, res) {
    try {
        let email = req.cookies.email;
        let { Name, address, contact, HotelName } = req.body;
        
        if(!Name || !address || !contact || !HotelName){
            return res.status(400).send("Please fill in all the fields.");
        }
        // Find the manager and update their profile details
        let user = await userModel.findOneAndUpdate(
            { email: email },
            { Name: Name, address: address, contact: contact, HotelName: HotelName },
            { new: true }
        );

        // Redirect to the manager dashboard
        res.redirect("/manager/dashboard");
    } catch (err) {
        console.log(err);
        res.status(500).send("Error updating manager profile");
    }
};

// Update profile details for Delivery - POST
module.exports.updateDetailsDelivery = async function(req, res) {
    try {
        let email = req.cookies.email;
        let { Name, address, contact, license, vehicleNumber } = req.body;

        if(!Name || !address || !contact || !license || !vehicleNumber){
            return res.status(400).send("Please fill in all the fields.");
        }
        // Find the delivery person and update their profile details
        let user = await userModel.findOneAndUpdate(
            { email: email },
            { Name: Name, address: address, contact: contact, license: license, vehicleNumber: vehicleNumber},
            { new: true }
        );

        // Redirect to the delivery dashboard
        res.redirect("/delivery/dashboard");
    } catch (err) {
        console.log(err);
        res.status(500).send("Error updating delivery profile");
    }
};

