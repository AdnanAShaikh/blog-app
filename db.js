const mongoose = require("mongoose");
const colors = require("colors");

const db = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("MongoDB connected  to !!".bgWhite.black);
  } catch (err) {
    console.log("error:  ", err);
  }
};

module.exports = db;
