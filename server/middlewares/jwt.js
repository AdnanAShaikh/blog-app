const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const generateToken = (id) => {
  const maxAge = 3 * 24 * 60 * 60;
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: maxAge });
};

const authenticateToken = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        // res.redirect("/login");
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    // res.redirect("/login");
  }
};

module.exports = { generateToken, authenticateToken };
