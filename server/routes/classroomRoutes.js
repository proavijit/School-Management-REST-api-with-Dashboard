const express = require('express');
const router = express.Router();
const classroomController = require('../controllers/classroomController');

// Routes for classrooms
router.post('/', classroomController.createClassroom);  // Create a new classroom
router.get('/', classroomController.getClassrooms);  // Get all classrooms
router.get('/:classroomId', classroomController.getClassroomById);  // Get classroom by ID
router.put('/:classroomId', classroomController.updateClassroom);  // Update classroom details
router.delete('/:classroomId', classroomController.deleteClassroom);  // Delete a classroom

module.exports = router;
