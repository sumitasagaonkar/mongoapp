const express = require("express");
const studentController = require("../controllers/studentController");

const router = express.Router();

module.exports.singupRoute = router.post("/sign", (req, res) => {
  require("../controllers/studentController").singup(req, res);
});
module.exports.loginRoute = router.post("/log", (req, res) => {
  require("../controllers/studentController").login(req, res);
});
module.exports.getUserDetailsRoute = router.post("/", (req, res) => {
  require("../controllers/studentController").getUserDetails(req, res);
});
// module.exports.updateUserDetails = router.post('/',require('../controllers/studentController'))
