const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const colors = require("colors");
const dotenv = require("dotenv");

//env config
dotenv.config();

//MongoDB connection
const db = require("./db");
db();

const app = express();

//middlewars

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes

//user routes
const userRoutes = require("./routes/userRoutes");
app.use("/api/v1/user", userRoutes);

//blog routes

const blogRoutes = require("./routes/blogRoutes");
app.use("/api/v1/blog", blogRoutes);

//PORT

const PORT = process.env.PORT || 3715;

app.listen(PORT, () => {
  console.log(
    `Server running on ${process.env.DEV_MODE} port ${PORT}`.bgGreen.white
  );
});
