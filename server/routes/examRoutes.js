const express = require('express');
const router = express.Router();
const examController = require('../controllers/examController');

// Routes for Exam
router.post('/', examController.createExam);
router.get('/', examController.getExams);
router.get('/:examId', examController.getExamById);
router.put('/:examId', examController.updateExam);
router.delete('/:examId', examController.deleteExam);

module.exports = router;
