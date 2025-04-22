const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');
const authMiddleware = require('../middlewares/authMiddleware');  

// Create a new teacher
router.post('/', authMiddleware, teacherController.createTeacher);

// Get all teachers
router.get('/', teacherController.getAllTeachers);

// Get teacher by ID
router.get('/:id', teacherController.getTeacherById);

// Update teacher details
router.put('/:id', authMiddleware, teacherController.updateTeacher);

// Delete a teacher
router.delete('/:id', authMiddleware, teacherController.deleteTeacher);

module.exports = router;
