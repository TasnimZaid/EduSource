const jwt = require("jsonwebtoken");
const User = require("../model/users"); // Import User schema
require("dotenv").config();

const auth = async (req, res, next) => {
  const token = req.cookies.token;
  
  console.log("Received token:", token);
  if (!token) {
    console.log("No token provided in the request.");
    return res.status(401).send("Access denied. No token provided.");
  }

  try {
    // Verify JWT token and extract user data
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Token decoded:", decoded);

    // Find the user in the database based on token data
    const user = await User.findById(decoded.id).select('-password'); // exclude password
    if (!user) {
      console.log("User not found in the database.");
      return res.status(404).send("User not found.");
    }

    // Attach user information to the request for further use
    req.user = {
      id: user._id,
      email: user.email,
      role: user.role,
    };

    // Log the role of the user for debugging purposes
    console.log("Authenticated User:", req.user);

    // Optionally: Role-based access control (e.g., teachers, coaches, admins)
    if (req.user.role === "admin" || req.user.role === "teacher" || req.user.role === "coach") {
      console.log(`Access granted to ${req.user.role}`);
      next();
    } else {
      return res.status(403).send("Access denied. You do not have the right permissions.");
    }
  } catch (error) {
    console.error("Error verifying token:", error.message);
    return res.status(500).send("Error verifying token: " + error.message);
  }
};

module.exports = auth;
