const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const uri = process.env.MONGODB_URI;

const dbConnectionPromise = mongoose.connect(uri);

module.exports = dbConnectionPromise;
