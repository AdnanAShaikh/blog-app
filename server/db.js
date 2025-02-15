const mongoose = require("mongoose");

const db = async () => {
  try {
    await mongoose
      .connect(process.env.DB_GLOBAL_URL || process.env.DB_LOCAL_URL)
      .then(() => {
        console.log("MongoDB connected  to !!".bgWhite.black);
      });
  } catch (err) {
    console.log("error:  ", err);
  }
};

module.exports = db;
