const express = require('express');
const router = express.Router();
const gradeController = require('../controllers/gradeController');

// Routes for Grade
router.post('/', gradeController.createGrade);      // Create a new Grade
router.get('/', gradeController.getGrades);         // Get all Grades
router.get('/:gradeId', gradeController.getGradeById); // Get Grade by ID
router.put('/:gradeId', gradeController.updateGrade);  // Update Grade details
router.delete('/:gradeId', gradeController.deleteGrade); // Delete Grade

module.exports = router;
