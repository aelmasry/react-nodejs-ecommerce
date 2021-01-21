const mongoose = require("mongoose"),
  validator = require("validator");

mongoose.Promise = global.Promise;

require("dotenv").config();

//connect to mongoose
const DATABASE_URL = process.env.DATABASE_URL;

const connectDB = async () => {
  try {
    await mongoose
      .connect(DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
        useFindAndModify: false,
        useCreateIndex: true,
      })
      .then(() => {
        console.log("Database connection successful!");
      })
      .catch((err) => {
        console.log("Database connection error!", err);
        process.exit();
      });
  } catch (err) {
    console.log("Failed to connect to MongoDB", err);
  }
};

module.exports = mongoose;
