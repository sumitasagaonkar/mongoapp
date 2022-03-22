const { reject } = require("bcrypt/promises");
const connection = require("../services/mongodb");
const bcrypt = require("bcrypt");

module.exports.checkUserExistence = async function checkUserExistence(email) {
  const db = await connection();
  console.log(db);
  return new Promise((resolve, reject) => {
    if (email != null) {
      db.collection("users").findOne({ email: email }, (err, doc) => {
        if (doc) {
          resolve(true);
        } else if (err) {
          let obj = {};
          obj.code = 503;
          obj.name = "database_server_error";
          obj.err = err;
          reject(obj);
        } else {
          resolve(false);
        }
      });
    } else {
      let obj = {};
      obj.code = 422;
      obj.name = "invaid_data";
      obj.message = "Require Data not found";
      reject(obj);
    }
  });
};

module.exports.addNewUser = async function addNewUser(
  name,
  email,
  password,
  confirmPassword
) {
  const db = await connection();
  return new Promise((resolve, reject) => {
    if (
      (name != null && email != null && password != null,
      confirmPassword != null)
    ) {
      if (password === confirmPassword) {
        const hash = bcrypt.hashSync(password, 10);
        let doc = {
          name: name,
          email: email,
          password: hash,
          age: "",
          gender: "",
          dob: "",
          mobile: "",
        };
        db.collection("users").insertOne(doc, (err, result) => {
          if (err) {
            let obj = {};
            obj.code = 500;
            obj.name = "database_server_error";
            obj.err = err;
            reject(obj);
          } else {
            resolve(true);
          }
        });
      } else {
        let obj = {};
        obj.code = 403;
        obj.name = "incorrect_passwords";
        obj.err = "Password does not match";
        reject(obj);
      }
    }
  });
};

module.exports.getUserPasswordHash = async function (email) {
  const db = await connection();
  return new Promise((resolve, reject) => {
    if (email != null) {
      db.collection("users").findOne({ email: email }, (err, doc) => {
        if (doc) {
          let data = {
            hashPassword: doc.password,
            userId: doc._id,
          };
          resolve(data);
        } else {
          let obj = {};
          obj.code = 503;
          obj.name = "database_server_error";
          obj.err = err;
          reject(err);
        }
      });
    } else {
      let obj = {};
      obj.code = 422;
      obj.name = "invalid_fields";
      obj.err = "Required field missing...";
      reject(obj);
    }
  });
};
module.exports.verifyUser = async function verifyUser(password, hashPassword) {
  const db = await connection();
  return new Promise((resolve, reject) => {
    try {
      const result = bcrypt.compareSync(password, hashPassword); // false
      if (result == true) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      let obj = {};
      obj.code = 500;
      obj.name = "runtime_error";
      obj.err = e;
      reject(obj);
    }
  });
};

module.exports.checkUserExistenceByUserId =
  async function checkUserExistenceByUserId(userId) {
    const db = await connection();
    return new Promise((resolve, reject) => {
      if (userId != null) {
        db.collection("users").findOne({ _id: userId }, (err, doc) => {
          if (doc) {
            resolve(true);
          } else if (err) {
            let obj = {};
            obj.code = 503;
            obj.name = "database_server_error";
            obj.err = err;
            reject(err);
          } else {
            resolve(false);
          }
        });
      } else {
        let obj = {};
        obj.code = 422;
        obj.name = "invalid_fields";
        obj.error = "Required field missing ! - userId";
        reject(obj);
      }
    });
  };

module.exports.getUserDetailsByUserId = async function getUserDetailsByUserId(
  userId
) {
  const db = await connection();
  return new Promise((resolve, reject) => {
    if (userId != null) {
      db.collection("users").findOne({ _id: userId }, (err, doc) => {
        if (err) {
          let obj = {};
          obj.code = 503;
          obj.name = "database_server_error";
          obj.err = err;
        } else {
          resolve(doc);
        }
      });
    } else {
      let obj = {};
      obj.code = 422;
      obj.name = "invalid_fields";
      obj.err = "Required fields missing ! - userId";
      reject(obj);
    }
  });
};
