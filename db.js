const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const uri = process.env.MONGODB_URI;

const connectDb = async () => {
  try {
    await mongoose.connect(uri);
    return "Conexión exitosa";
  } catch (error) {
    throw new Error(error);
  }
};
module.exports = connectDb;
