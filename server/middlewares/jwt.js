const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  const payload = {
    id: user._id,
  };

  const secret = "ABC123";

  const options = {
    expiresIn: "24h",
  };

  return jwt.sign(payload, secret, options);
};

const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(401).send("Access Denied");

  try {
    const secret = "ABC123";
    const verified = jwt.verify(token, secret);
    console.log(verified);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send("Invalid Token");
  }
};

module.exports = { generateToken, authenticateToken };
