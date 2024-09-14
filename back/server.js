require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require('./routes/user'); 
const resourcesRoute = require('./routes/resourcesRoute')
const port = 1000;
const app = express();




// Middleware
app.use(express.json());
app.use(
    cors({
      origin: "http://localhost:5173",
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
      allowedHeaders: ["Content-Type"],
      credentials: true,
    })
);

// Connect to MongoDB
const mongoURI = process.env.MONGO_URI;
mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });



// Routes

app.use('/api', userRoutes);
app.use('/api' , resourcesRoute ) ;







app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
