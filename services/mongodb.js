const { MongoClient } = require("mongodb");

require("dotenv").config();
module.exports = async function connection() {
  const uri = process.env.ATLAS_URI;
  const client = await new MongoClient(
    "mongodb+srv://dbuser:dbuser12345@cluster0.di7qp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  );
  await client
    .connect()
    .then((success) => {
      console.log("database connection established");
    })
    .catch((err) => {
      console.log("Database connection failed..", err);
    });
  const db = await client.db("login-app-db");
  return db;
};
// connection()
