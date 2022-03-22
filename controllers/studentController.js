const studentServices = require("../services/studentServices");
const jwt = require("jsonwebtoken");
require("dotenv").config();
function singup(req, res) {
  console.log("call to signup");
  if (
    (req.body.email != null && req.body.name != null,
    req.body.password && req.body.confirmPassword != null)
  ) {
    console.log("ddd");
    studentServices
      .checkUserExistence(req.body.email)
      .then((userExists) => {
        if (userExists) {
          res.status(400).json({
            code: 400,
            name: "user_already_exists",
            erorr: "User already present",
          });
        } else {
          studentServices
            .addNewUser(
              req.body.name,
              req.body.email,
              req.body.password,
              req.body.confirmPassword
            )
            .then((result1) => {
              res.status(200).json({
                code: 200,
                name: "created",
                message: "New user created",
              });
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    res.status(422).json({
      code: 422,
      name: "invalid_fields",
      erorr: "Required fields missing",
    });
  }
}

function login(req, res) {
  if (req.body.email != null && req.body.password != null) {
    studentServices
      .getUserPasswordHash(req.body.email)
      .then((data) => {
        studentServices
          .verifyUser(req.body.password, data.hashPassword)
          .then((result) => {
            if (result == true) {
              let user = {
                email: req.body.email,
                userId: data.userId,
              };
              jwt.sign(
                { user: user },
                process.env.SECERTE_KEY,
                { expiresIn: "24h" },
                (err, token) => {
                  if (!err) {
                    res.status(200).json({
                      code: 200,
                      name: "login_success",
                      message: "Logged in successfully",
                      data: {
                        token: token,
                        userId: data.userId,
                      },
                    });
                  }
                }
              );
            } else {
              res.status(403).json({
                code: 403,
                name: "incorrect_password",
                error: "Invalid Password",
              });
            }
          });
      })
      .catch((err) => {
        res.status(err.code).json({
          code: err.code,
          name: err.name,
          error: err.err,
        });
      });
  } else {
    res.status(422).json({
      code: 422,
      name: "invalid_fields",
      error: "Required fields missing",
    });
  }
}

function getUserDetails(req, res) {
  if (req.body.userId != null) {
    studentServices
      .checkUserExistenceByUserId(req.body.userId)
      .then((exists) => {
        if (exists == true) {
          studentServices
            .getUserDetailsByUserId(req.body.userId)
            .then((data) => {
              res.status(200).json({
                code: 200,
                name: "found",
                message: "User details fetched successfully",
                data: data,
              });
            })
            .catch((err) => {
              res.status(err.code).json({
                code: err.code,
                name: err.name,
                error: err.err,
              });
            });
        } else {
          res.status(400).json({
            code: 400,
            name: "user_does_not_exists",
            error: "User does not exists",
          });
        }
      })
      .catch((err) => {
        res.status(err.code).json({
          code: err.code,
          name: err.name,
          error: err.err,
        });
      });
  } else {
    res.status(422).json({
      code: 422,
      name: "invalid_fields",
      error: "Required field missing ! - userId",
    });
  }
}

function updateUserDetails(req, res) {
  if (req.body.userId != null) {
  }
}

module.exports = {
  singup,
  login,
  getUserDetails,
  updateUserDetails,
};
