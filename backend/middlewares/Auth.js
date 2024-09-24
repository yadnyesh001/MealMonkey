class Auth{
    authorizeCustomer(req, res, next) {
        const role = req.userRole;
        if(role === "customer"){
            next();
        }else{
            res.status(401).send("Unauthorized User");
        }
    }

    authorizeManager(req, res, next) {
        const role = req.userRole;
        if(role === "manager"){
            next();
        }else{
            res.status(401).send("Unauthorized User");
        }
    }

    authorizeDeliveryPartner(req, res, next) {
        const role = req.userRole;
        if(role === "Delivery Partner"){
            next();
        }else{
            res.status(401).send("Unauthorized User");
        }
    }

    authorizeAdmin(req, res, next) {
        const role = req.userRole;
        if(role === "admin"){
            next();
        }else{
            res.status(401).send("Unauthorized User");
        }
    }
    
}


module.exports = new Auth();