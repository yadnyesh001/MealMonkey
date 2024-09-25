const userModel = require("../models/baseUserModel")
const Restaurant = require("../models/restaurantModel")
module.exports.profileDetailsCustomer = async function(req, res) {
    try {
        const user = await userModel.findById(req.userId).select("-password");
        if (!user) {
            return res.status(404).send("User not found.");
        }

        // Render the profile details form and pass user data
        // res.render("profileDetailsCustomer", { user }); // Adjust the template name as needed
        res.send("into the Profile Details Page");
    } catch (err) {
        console.log(err);
        res.status(500).send("Error retrieving user details");
    }
};  


module.exports.updateDetailsCustomer = async function(req, res) {
    try {
        const {address, contact } = req.body;

        // Validate input
        if (!address || !contact) {
            return res.status(400).send("Please fill in all the fields.");
        }
        console.log("into customer contorler")
        console.log(req.userId);
        
        // Find the user and update their profile details
        const updatedUser = await userModel.findByIdAndUpdate(
            req.userId,
            { address, contact },
            { new: true } // Return the updated user document
        );

        if (!updatedUser) {
            return res.status(404).send("User not found.");
        }

        // Redirect to the customer dashboard after updating
        res.redirect(303,"/customer/dashboard");
    } catch (err) {
        console.log(err);
        res.status(500).send("Error updating user profile");
    }
};


module.exports.getTopRestaurant = async function(req, res){
    try {
        // Fetch the top 8 restaurants sorted by rating (or any other criteria)
        const restaurants = await Restaurant.find({})
        .sort({ rating: -1 }) // Sort by rating (descending)
        .limit(8)
        .select('hotelName rating `photos` address knownFor'); // Only fetch necessary fields
        
        console.log(restaurants);
        return res.status(200).json(restaurants);
    } catch (error) {
        console.error("Error fetching restaurants:", error);
        return res.status(500).json({ message: 'Server Error' });
    }
}



