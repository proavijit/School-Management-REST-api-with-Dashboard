const express = require('express');
const router = express.Router();
const classroomController = require('../controllers/classroomController');

// Routes for classrooms
router.post('/', classroomController.createClassroom);
router.get('/', classroomController.getClassrooms);
router.get('/:classroomId', classroomController.getClassroomById);
router.put('/:classroomId', classroomController.updateClassroom);
router.delete('/:classroomId', classroomController.deleteClassroom);

module.exports = router;
