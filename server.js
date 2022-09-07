require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./config/dbConfig");
const routes = require("./routes");

const PORT = process.env.PORT || 3500;

// Attempt to open database connection
connectDB();

// Create server
const app = express();

// Load server middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);


// Check for database connection, then start web server
mongoose.connection.once("open", () => {
  console.log("Database connection established.");
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});

// Check for database connection errors
mongoose.connection.on("error", (error) => {
  console.error(error);
  // Add event logging here
});
