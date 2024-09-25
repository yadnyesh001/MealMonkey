const userModel = require ("../models/baseUserModel")
class Auth{
    async authorizeCustomer(req, res, next) {
        try{
            const user = await userModel.findById(req.user.id)
            if(!user){
                return res.status(404).send("User not found");
            }
            if(user.role === "customer"){
                next();
            }else{
                res.status(401).send("Unauthorized User");
            }
        }catch(err){
            throw new Error(err)
        }
    }

    async authorizeManager(req, res, next) {
        try{
            const user = await userModel.findById(req.user.id)
            if(!user){
                return res.status(404).send("User not found");
            }
            if(user.role === "restaurant"){
                next();
            }else{
                res.status(401).send("Unauthorized User");
            }
        }catch(err){
            throw new Error(err)
        }
    }

    async authorizeDeliveryPartner(req, res, next) {
        try{
            const user = await userModel.findById(req.user.id)
            if(!user){
                return res.status(404).send("User not found");
            }
            if(user.role === "popularRestaurants"){
                next();
            }else{
                res.status(401).send("Unauthorized User");
            }
        }catch(err){
            throw new Error(err)
        }
    }

    async authorizeAdmin(req, res, next) {
        try{
            const user = await userModel.findById(req.user.id)
            if(!user){
                return res.status(404).send("User not found");
            }
            if(user.role === "admin"){
                next();
            }else{
                res.status(401).send("Unauthorized User");
            }
        }catch(err){
            throw new Error(err)
        }
    }
    
}


module.exports = new Auth();