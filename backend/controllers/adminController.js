const userModel = require("../models/baseUserModel")

module.exports.getUsers = async function(req, res){
    try{
        const users = await userModel.find({role: "customer"});
        if(!users) res.send("User not Found")
        return users
    }catch(err){
        res.send(err);
    }
}

module.exports.getRestaurants = async function(req, res){
    try{
        const restaurants = await userModel.find({role: "manager"})
        if(!restaurants) res.send("No Manager Found")
        return restaurants
    }catch(err){
        res.send(err)
    }
}

module.exports.getDeliveryPartner = async function(req, res){
    try{
        const deliveryPartners = await userModel.find({role: "deliveryPartner"})
        if(!deliveryPartners) res.send("No Delivrey Partner Found")
            return deliveryPartners
    }catch(err){
        res.send(err)
    }
}

module.exports.deleteUser = async function(req, res){
    try{
        const user = await userModel.findByIdAndUpdate(req.params.id, {email: "", password: ""})
        if(!user) res.send("User not Found")
    }catch(err){
        res.send(err)
    }
}

