const express = require("express");
const app = express();

const cors = require("cors");

app.use(cors());

const auth = require("./middleware/auth");
// const studentController = require('./controllers/studentController')

const studentRoutes = require("./routes/studentRoutes");

app.use(express.json());
app.use(express.urlencoded());
app.use("/login", studentRoutes.loginRoute);
// singup route
app.use("/signup", studentRoutes.singupRoute);

//login route

// getUserDetails route
app.use("/getUserDetails", auth, studentRoutes.getUserDetailsRoute);

// updateUserDetails
// app.use('/updateUserDetails',)
module.exports = app;
