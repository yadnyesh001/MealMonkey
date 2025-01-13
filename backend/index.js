const express = require("express");
const path = require('path');
const cookieParser = require("cookie-parser");
const multer = require("multer"); 
const cors = require("cors");
const dotenv = require("dotenv");
const PORT = process.env.PORT || 3000;
require("./config/mongoose_config.js");
// Load environment variables


// Middleware
const app = express();
dotenv.config();
app.use(cors({
    origin: 'https://mealmonkey-food.vercel.app/', // Your frontend URL
    credentials: true // This allows cookies to be included in cross-origin requests
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(path.join(__dirname, 'public')));
// // File Storage
// const Storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, "public/assets");
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname);
//     }
// });


// const upload = multer({ storage: Storage });


// Routes
const indexRouter = require("./routes/indexRouter.js");
const customerRouter = require("./routes/customerRouter.js");
const restaurantRouter = require("./routes/restaurantRouter.js");
const deliveryPartnerRouter = require("./routes/deliveryPartnerRouter.js");
const adminRouter = require("./routes/adminRouter.js");

app.use("/", indexRouter);
app.use("/customer", customerRouter);
app.use("/restaurant", restaurantRouter);
app.use("/deliveryPartner", deliveryPartnerRouter);
app.use("/admin", adminRouter);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
