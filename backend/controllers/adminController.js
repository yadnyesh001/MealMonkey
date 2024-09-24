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

class CRUD{
    getAllUsers = async function(model, role){
        try{
            const users = await model.find({role: role})

            if(users.length === 0){
                return {message: "No Users Found for this role"}
            }
            return users
        }catch(err){
            throw new Error(err)
        }
    }

    getUser = async function(model, id){
        try{
            const user = await model.findOne({_id: id})
            if(!user) return {message: "User not Found"}
            return user
        }catch(err){
            throw new Error(err)
        }
    }

    deleteUser = async function(model, id){
        try{
            const user = await model.findByIdAndDelete(id)
            if(!user) return {message: "User not Found"}
        }catch(err){
            throw new Error(err)
        }

    }

    accessControl = async function(model, id, role){
        try{
            const user = await model.findOne({id: id})
            if(!user) return {message: "User not Found"}
            user.role = role
            await user.save()
            return user
        }catch(err){
            throw new Error(err)
        }
    }
    
    getAllOrders = async function(model){
        try{
            
        }catch(err){
            throw new Error(err)
        }
    }
}


module.exports = new CRUD()