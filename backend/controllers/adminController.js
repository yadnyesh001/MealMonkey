const customer = require("../models/customerModel");
const restaurant = require("../models/restaurantModel");
const deliveryPartner = require("../models/deliveryPartnerModel");

// module.exports.getUsers = async function(req, res){
//     try{
//         const users = await userModel.find({role: "customer"});
//         if(!users) res.send("User not Found")
//         return users
//     }catch(err){
//         res.send(err);
//     }
// }

// module.exports.getRestaurants = async function(req, res){
//     try{
//         const restaurants = await userModel.find({role: "manager"})
//         if(!restaurants) res.send("No Manager Found")
//         return restaurants
//     }catch(err){
//         res.send(err)
//     }
// }

// module.exports.getDeliveryPartner = async function(req, res){
//     try{
//         const deliveryPartners = await userModel.find({role: "deliveryPartner"})
//         if(!deliveryPartners) res.send("No Delivrey Partner Found")
//             return deliveryPartners
//     }catch(err){
//         res.send(err)
//     }
// }

// module.exports.deleteUser = async function(req, res){
//     try{
//         const user = await userModel.findByIdAndUpdate(req.params.id, {email: "", password: ""})
//         if(!user) res.send("User not Found")
//     }catch(err){
//         res.send(err)
//     }
// }

class CRUD{
    getCustomers = async function(){
        try{
            const users = await customer.find({role: "customer"})

            if(users.length === 0){
                return {message: "No Users Found for this role"}
            }
            return users
        }catch(err){
            throw new Error(err)
        }
    }
    getRestaurants = async function(){
        try{
            const users = await restaurant.find({role: "restaurant"})

            if(users.length === 0){
                return {message: "No Users Found for this role"}
            }
            return users
        }catch(err){
            throw new Error(err)
        }
    }
    getDeliveryPartner = async function(){
        try{
            const users = await deliveryPartner.find({role: "deliveryPartner"})

            if(users.length === 0){
                return {message: "No Users Found for this role"}
            }
            return users
        }catch(err){
            throw new Error(err)
        }
    }

    getUser = async function(req, res){
        try{

            let { email } = req.body
            let user = await customer.findOne({ email: email }) ||
                   await deliveryPartner.findOne({ email: email }) ||
                   await restaurant.findOne({ email: email });

             // If no user is found
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            // Extract user data based on the role
            let userData = {
                username: user.username,
                email: user.email,
                address: user.address,
                contact: user.contact,
                role: user.role
            };

            if (user.role === 'deliveryPartner') {
                userData.license = user.license;
                userData.vehicleNumber = user.vehicleNumber;
            } else if (user.role === 'restaurant') {
                userData.hotelName = user.hotelName;
                userData.averageCost = user.averageCost;
                userData.knownFor = user.knownFor;
                userData.type = user.type;
                userData.rating = user.rating;
            }

            // Return the user data based on the role
            return res.status(200).json(userData);
        }catch(err){
            throw new Error(err)
        }
    }

    deleteUser = async (req, res) => {
        try {
            const { email } = req.body;
    
            // Attempt to delete from each model
            const deletedCustomer = await customer.findOneAndDelete({ email: email });
            const deletedRestaurant = await restaurant.findOneAndDelete({ email: email });
            const deletedDeliveryPartner = await deliveryPartner.findOneAndDelete({ email: email });
            console.log(deletedCustomer)
            // Check if any deletion was successful
            if (deletedCustomer || deletedRestaurant || deletedDeliveryPartner) {
                return res.status(200).json({ message: "User deleted successfully" });
            }
    
            return res.status(404).json({ message: "User not found" });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: "Internal server error" });
        }
    };

    changeUserRole = async (req, res) => {
        const { user_email, newRole } = req.body;
      
        try {
          // Find the user in all schemas in parallel
          const [foundCustomer, foundRestaurant, foundDeliveryPartner] = await Promise.all([
            customer.findOne({ email: user_email }),
            restaurant.findOne({ email: user_email }),
            deliveryPartner.findOne({ email: user_email }),
          ]);
      
          let existingUser = foundCustomer || foundRestaurant || foundDeliveryPartner;
          let currentModel;
          console.log(existingUser)
          // Determine which model the user belongs to
          if (foundCustomer) {
            currentModel = customer;
          } else if (foundRestaurant) {
            currentModel = restaurant;
          } else if (foundDeliveryPartner) {
            currentModel = deliveryPartner;
          }
      
          // If user is found, proceed to delete and create new user
          if (existingUser) {
            // Prepare user data
            const userData = {
              name: existingUser.name,
              email: existingUser.email,
              address: existingUser.address,
              contact: existingUser.contact,
              role: newRole,
            };
      
            // Delete the user from the old schema
            await currentModel.deleteOne({ email: user_email });
      
            // Create a new user in the new schema
            let newUser;
            if (newRole === 'customer') {
              newUser = new customer(userData);
            } else if (newRole === 'restaurant') {
              newUser = new restaurant(userData);
            } else if (newRole === 'deliveryPartner') {
              newUser = new deliveryPartner(userData);
            } else if(newRole === 'admin') {
                newUser = new customer({ ...userData, isAdmin: true });
            }else {
              return res.status(400).json({ success: false, message: 'Invalid role' });
            }
      
            await newUser.save();
      
            return res.status(200).json({ success: true, user: newUser });
          } else {
            return res.status(404).json({ success: false, message: 'User not found in any schema' });
          }
        } catch (error) {
          console.error(error);
          return res.status(500).json({ success: false, message: error.message });
        }
      };
      
    
    // getAllOrders = async function(model){
    //     try{
            
    //     }catch(err){
    //         throw new Error(err)
    //     }
    // }
}


module.exports = new CRUD()


//get all customers
// get all managers
// add customer
// add admin
// add manager
// delete customer
// delete admin
// delete manager
//chnage role
//get user with id / email 