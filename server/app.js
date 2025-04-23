const express = require("express");
const app = express();
const mongoose = require("mongoose");
require('dotenv').config();
const cors = require("cors");
const connectDB = require('./config/db');


const userRouter = require("./routes/user.route");
const studentRoutes = require('./routes/studentRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const courseRoutes = require('./routes/courseRoutes');
const departmentRoutes = require('./routes/departmentRoutes');
const classroomRoutes = require('./routes/classroomRoutes');
const assignmentRoutes = require('./routes/assignmentRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const examRoutes = require('./routes/examRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const parentRoutes = require('./routes/parentRoutes');
const authRoutes = require('./routes/authRoutes');

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Database Connection  
connectDB();

// Test Routes
app.use("/api/users", userRouter);

// All Routes
app.use('/api/students', studentRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/classrooms', classroomRoutes);
app.use('/api/assignments', assignmentRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/exams', examRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/parents', parentRoutes);
app.use('/api/auth', authRoutes);

// Show Browser root some message 
app.get('/', (req, res) => {
  res.send('<h1> Hello from MongoDB + Mongoose </h1>');
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
