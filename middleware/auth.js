const config = require("config");
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // Get token from global headers
  const token = req.header("x-auth-token");

  if (!token) {
    return res
      .status(400)
      .json({ errors: [{ msg: "No token, authorization denied!" }] });
  }

  //If we get a token
  try {
    const decoded = jwt.verify(token, config.get("jwt"));
    req.user = decoded.user;
    // Move to next piece of middleware
    next();
  } catch (err) {
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
};
