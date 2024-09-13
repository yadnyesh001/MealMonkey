const PORT = process.env.PORT || 3000;
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("./config/mongoose_config.js");
app.use(cors());
app.use(cookieParser());
const dotenv = require("dotenv");
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const indexRouter = require("./routes/indexRouter.js")
const userRouter = require("./routes/userRouter.js")
const managerRouter = require("./routes/managerRouter.js")
const deliveryRouter = require("./routes/deliveryRouter.js")
const adminRouter = require("./routes/adminRouter.js")


// app.get("/", (req, res) => {
//     res.send("Welcome ");
// })

app.listen(`${PORT}`, () => {
    try{
        console.log(`Server running on http://localhost:${PORT}`);
    }
    catch(err){
        console.log(err, ": Could not start server");
    }
})

app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/manager", managerRouter);
app.use("/delivery", deliveryRouter);
app.use("/admin", adminRouter);
