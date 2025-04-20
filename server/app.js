const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require("./routes/user.route");
const connectDB = require('./config/db');

const app = express();

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Database Connection  
connectDB();

// Routes
app.use("/api/users", userRouter);

// Serve frontend (optional)
app.get('/', (req, res) => {
  res.send('<h1>🚀 Hello from MongoDB + Mongoose!</h1>');
});

// 404 Route Not Found Handler
app.use((req, res, next) => {
  res.status(404).json({
    message: "Route not found",
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Something went wrong!",
  });
});

module.exports = app;
