const express = require('express');
const router = express.Router();
const assignmentController = require('../controllers/assignmentController');

// Route for submitting assignments
router.post('/submit', assignmentController.submitAssignment);

module.exports = router;
