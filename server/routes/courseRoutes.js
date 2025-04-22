const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const authMiddleware = require('../middlewares/authMiddleware');

// Course routes
router.post('/', authMiddleware, courseController.createCourse);
router.get('/', authMiddleware, courseController.getCourses);
router.get('/:id', authMiddleware, courseController.getCourseById);
router.put('/:id', authMiddleware, courseController.updateCourse);
router.delete('/:id', authMiddleware, courseController.deleteCourse);

module.exports = router;
