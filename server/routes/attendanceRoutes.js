const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');

// Routes for Attendance
router.post('/', attendanceController.createAttendance);
router.get('/', attendanceController.getAttendances);
router.get('/student/:studentId', attendanceController.getAttendanceByStudent);
router.get('/date/:classDate', attendanceController.getAttendanceByDate);
router.put('/:attendanceId', attendanceController.updateAttendanceStatus);
router.delete('/:attendanceId', attendanceController.deleteAttendance);

module.exports = router;
