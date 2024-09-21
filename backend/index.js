const PORT = process.env.PORT || 3000;
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
require("./config/mongoose_config.js");

// Load environment variables
dotenv.config();

// Middleware
// app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
