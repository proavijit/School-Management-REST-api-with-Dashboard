const express = require('express');
const router = express.Router();
const assignmentController = require('../controllers/assignmentController');

// Routes for Assignment
router.post('/', assignmentController.createAssignment);          // Create Assignment
router.get('/', assignmentController.getAssignments);             // Get All Assignments
router.get('/:id', assignmentController.getAssignmentById);      // Get Assignment By ID
router.put('/:id', assignmentController.updateAssignment);       // Update Assignment
router.delete('/:id', assignmentController.deleteAssignment);    // Delete Assignment
router.post('/submit', assignmentController.submitAssignment);   // Submit Assignment

module.exports = router;
