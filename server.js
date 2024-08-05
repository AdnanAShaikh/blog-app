const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const colors = require("colors");
const dotenv = require("dotenv");
const path = require("path");

// env config
dotenv.config();

// MongoDB connection
const db = require("./db");
db();

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "/frontend/build")));

// routes
// user routes
const userRoutes = require("./routes/userRoutes");
app.use("/api/v1/user", userRoutes);

const blogRoutes = require("./routes/blogRoutes");
app.use("/api/v1/blog", blogRoutes);

// Catch-all handler to serve the React app
if (process.env.NODE_ENV === "production") {
  //*Set static folder up in production
  app.use(express.static("client/build"));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

const PORT = process.env.PORT || 3715;

app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.DEV_MODE} mode on port ${PORT}`.bgGreen
      .white
  );
});
