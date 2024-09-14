const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../model/User");  // Assuming single User schema with role field
require("dotenv").config();
// const { OAuth2Client } = require("google-auth-library");
// const { OAuth2Client } = require("google-auth-library");


exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate email and password
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Find the user by email, and make sure they are not deleted or inactive
    const user = await User.findOne({ email});
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password, or account is inactive or deleted" });
    }

    // Check if the provided password matches the user's hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Create a JWT token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // Set token and user cookies with proper security settings
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",  // Secure cookie only in production
      sameSite: "Lax",
    });

    res.status(200).json({ message: `${user.role} logged in successfully!` });
  } catch (error) {
    res.status(500).send("Error logging in: " + error.message);
  }
};




// Register functions for each role

exports.register = async (req, res) => {
  try {
    const { username, email, password, confirmPassword, role } = req.body;

    // Ensure the role is valid
    if (!['teacher', 'coach', 'admin'].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role
    });

    // Save the new user in the database
    await newUser.save();

    // Generate a JWT token
    const token = jwt.sign({ id: newUser._id, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // Set token and user ID cookies
    res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "Lax" });
    res.cookie("userId", newUser._id.toString(), { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "Lax" });

    // Respond with success message
    res.status(201).json({ message: `${role.charAt(0).toUpperCase() + role.slice(1)} registered successfully!` });
  } catch (error) {
    res.status(500).send("Error registering user: " + error.message);
  }
};

// // Google signup/login

// const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID, process.env.JWT_SECRET);

// exports.googleSignup = async (req, res) => {
//   try {
//     const { id_token } = req.body;
//     const ticket = await client.verifyIdToken({
//       idToken: id_token,
//       audience: process.env.GOOGLE_CLIENT_ID,
//     });

//     const payload = ticket.getPayload();
//     if (!payload) {
//       throw new Error("Failed to get payload from Google token");
//     }

//     const { email, name, picture } = payload;
//     let user = await User.findOne({ email });

//     if (!user) {
//       user = new User({
//         username: name,
//         email,
//         profilePicture: picture,
//         googleId: payload.sub,
//       });
//       await user.save();
//     }

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "1h",
//     });

//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "Lax",
//     });

//     res.status(200).json({ token, user: { name: user.username, email: user.email } });
//   } catch (error) {
//     res.status(500).json({ message: "Error during Google signup", error });
//   }
// };

// exports.googleLogin = async (req, res) => {
//   try {
//     const { id_token } = req.body;
//     const ticket = await client.verifyIdToken({
//       idToken: id_token,
//       audience: process.env.GOOGLE_CLIENT_ID,
//     });

//     const { email, username } = ticket.getPayload();
//     let user = await User.findOne({ email });

//     if (!user) {
//       user = new User({ username, email });
//       await user.save();
//     }

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "1h",
//     });

//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "Lax",
//     });

//     res.status(200).json({ token });
//   } catch (error) {
//     res.status(500).json({ message: "Google login failed", error });
//   }
// };
