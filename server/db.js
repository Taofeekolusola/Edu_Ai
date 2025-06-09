require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = () => {
  const dbURI = process.env.MONGODB_URI;

  return mongoose
    .connect(dbURI)
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch((err) => console.error("Error connecting to MongoDB Atlas:", err));
};

module.exports = connectDB;