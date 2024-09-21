const UserModel = require ("../models/baseUserModel");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET_KEY;
module.exports = async function (req, res, next){
    //first check if there is token present in the cookies of the user
    if(!req.cookies.token){
        req.flash("error", "Please login first."); //flash can be used to store messages which can be used in the next request.
        return res.redirect("/");
    }
    try {
        let decoded = jwt.verify(req.cookies.token, SECRET_KEY);
        try {
            let user = await UserModel.findOne({ email: decoded.email }).select("-password");
            if (!user) {
                req.flash("error", "User not found.");
                return res.redirect("/");
            }
            req.user = user;
            next();
        } catch (dbErr) {
            console.error("Database error:", dbErr);
            req.flash("error", "Database error.");
            res.redirect("/");
        }
    } catch (jwtErr) {
        console.error("JWT verification error:", jwtErr);
        req.flash("error", "Invalid token or token expired.");
        res.redirect("/");
    }
    
}

