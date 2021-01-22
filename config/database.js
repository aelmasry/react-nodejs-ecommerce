const mongoose = require("mongoose"),
  validator = require("validator");

mongoose.Promise = global.Promise;

require("dotenv").config();

//connect to mongoose
const DATABASE_URL = process.env.DATABASE_URL;

const dbconnect = async () => {
  await mongoose
    .connect(DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    .then(() => {
      console.log("Successfully connect to MongoDB.");
    })
    .catch((err) => {
      console.log("Connection error", err);
      process.exit();
    });
};

module.exports = dbconnect;
