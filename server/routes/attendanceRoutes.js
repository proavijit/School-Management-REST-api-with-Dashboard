const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');

// Routes for Attendance
router.post('/', attendanceController.createAttendance);         // Create Attendance Record
router.get('/', attendanceController.getAttendances);            // Get All Attendance Records
router.get('/student/:studentId', attendanceController.getAttendanceByStudent);  // Get Attendance for Specific Student
router.get('/date/:classDate', attendanceController.getAttendanceByDate);       // Get Attendance for Specific Class (Date)
router.put('/:attendanceId', attendanceController.updateAttendanceStatus);  // Update Attendance Status
router.delete('/:attendanceId', attendanceController.deleteAttendance); // Delete Attendance Record

module.exports = router;
