const express = require('express');
const router = express.Router();
const gradeController = require('../controllers/gradeController');

// Routes for Grade
router.post('/', gradeController.createGrade);
router.get('/', gradeController.getGrades);
router.get('/:gradeId', gradeController.getGradeById);
router.put('/:gradeId', gradeController.updateGrade);
router.delete('/:gradeId', gradeController.deleteGrade);

module.exports = router;
