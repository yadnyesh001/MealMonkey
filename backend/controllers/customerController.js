// // const userModel = require("../models/userModel")
// // const bcrypt = require("bcrypt")


// // module.exports.registerUser = async function(req, res){
// //     try{
// //             let {username, email, password} = req.body;

// //         if(!username || !email || !password){
// //             return res.status(400).send("Please provide all the details");
// //         }
// //         let user = await userModel.findOne({email: email});
// //         if(user) return res.send("You already have and account, Please login");

// //         bcrypt.genSalt(10, function(err, salt){
// //             bcrypt.hash(password, salt, async function(err, hash){
// //                 if(err) throw err;
// //                 let newUser = new userModel({
// //                     username: username, 
// //                     email: email,
// //                     password: hash
// //                 })
// //                 await newUser.save();
// //                 let token = generateToken(user);
// //                 res.cookie("token", token);
// //                 res.cookie("email", email);
// //                 res.redirect("/ProfileDetails");
// //             })
// //         })
// //     }catch(err){
// //         console.log(err);
// //     }
// // }

// // module.exports.productDetails = async function(req, res){
// //     let email = req.cookies.email;
// //     let user = await userModel.findOne({email: email});
// //     if(!user){
// //         res.redirect("/");
// //     }else{
// //         res.send(user);
// //     }
// // }

// // module.exports.loginUser = async function(req, res){
// //     try{
// //             let {email, password} = req.body;
// //         let user = await userModel.findOne({email: email})
// //         if(!user) {
// //             res.send("Incorrect Username or Password.");
// //             return res.rediect("/");
// //         }
// //         bcrypt.compare(password, user.password, function(err, result){
// //             if(result){
// //                 let token = generateToken(user);
// //                 res.cookie("token", token);
// //                 res.redirect("/home");
// //             }else{
// //                 res.send("Incorrect Password.");
// //             }
// //         })
// //     }catch(err){
// //         console.log(err);
// //     }
// // }



// const userModel = require("../models/userModel");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");  // Assuming you're using JWT for token generation
// const secretKey = process.env.JWT_SECRET_KEY;    // Replace with actual secret key

// // Helper function to generate a JWT token
// function generateToken(user) {
//     return jwt.sign({ id: user._id, email: user.email }, secretKey, { expiresIn: '1h' });
// }

// // Register User
// module.exports.registerUser = async function(req, res) {
//     try {
//         let { username, email, password } = req.body;

//         if (!username || !email || !password) {
//             return res.status(400).send("Please provide all the details");
//         }

//         let user = await userModel.findOne({ email: email });
//         if (user) return res.send("You already have an account. Please login.");

//         bcrypt.genSalt(10, function(err, salt) {
//             bcrypt.hash(password, salt, async function(err, hash) {
//                 if (err) throw err;

//                 let newUser = new userModel({
//                     user: username,
//                     email: email,
//                     password: hash
//                 });

//                 await newUser.save();
//                 let token = generateToken(newUser);
//                 res.cookie("token", token);  // Store token in cookie
//                 res.cookie("email", email);  // Store email for product details update
//                 res.redirect("/profileDetails");  // Redirect to productDetails page
//             });
//         });
//     } catch (err) {
//         console.log(err);
//         res.status(500).send("Error in registering user");
//     }
// };

// // Show profile details form (GET)
// module.exports.profileDetails = async function(req, res) {
//     let email = req.cookies.email;
//     let user = await userModel.findOne({ email: email });
//     if (!user) {
//         return res.redirect("/");  // Redirect to home if user not found
//     }
//     // Render a page where the user can fill in additional details (like Name, address)
//     res.render("profileDetails", { user });
// };

// // Update profile details (POST)
// module.exports.updateProfileDetails = async function(req, res) {
//     let email = req.cookies.email;
//     let { name, address, contact } = req.body;

//     let user = await userModel.findOneAndUpdate(
//         { email: email },
//         { Name: name, address: address, contact: contact },
//         { new: true }
//     );

//     if (!user) {
//         return res.status(400).send("User not found");
//     }

//     res.redirect("/home");  // Redirect to home after updating details
// };

// // Login User
// module.exports.loginUser = async function(req, res) {
//     try {
//         let { email, password } = req.body;

//         let user = await userModel.findOne({ email: email });
//         if (!user) {
//             return res.status(400).send("Incorrect Username or Password.");
//         }

//         bcrypt.compare(password, user.password, function(err, result) {
//             if (result) {
//                 let token = generateToken(user);
//                 res.cookie("token", token);
//                 res.cookie("email", email);

//                 // Check if the user has filled in all required details
//                 if (!user.Name || !user.address) {
//                     return res.redirect("/profileDetails");  // Redirect to profile details if incomplete
//                 }

//                 res.redirect("/home");
//             } else {
//                 res.send("Incorrect Password.");
//             }
//         });
//     } catch (err) {
//         console.log(err);
//         res.status(500).send("Error in login");
//     }
// };

// // Logout User
// module.exports.logoutUser = function(req, res) {
//     res.clearCookie("token");
//     res.clearCookie("email");
//     res.redirect("/");
// };









// const userModel = require("../models/userModel");
// const address = require()