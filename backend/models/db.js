const mongo  = require("mongoose");

const DB_URL = process.env.DB_URL;

mongo
  .connect(DB_URL)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.log("MongoDB connection failed", err);
  });