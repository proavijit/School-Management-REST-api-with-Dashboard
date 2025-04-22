const express = require('express');
const router = express.Router();
const examController = require('../controllers/examController');

// Routes for Exam
router.post('/', examController.createExam);      // Create a new Exam
router.get('/', examController.getExams);         // Get all Exams
router.get('/:examId', examController.getExamById); // Get Exam by ID
router.put('/:examId', examController.updateExam);  // Update Exam details
router.delete('/:examId', examController.deleteExam); // Delete Exam

module.exports = router;
