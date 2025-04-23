const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/departmentController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, departmentController.createDepartment);
router.get('/', departmentController.getAllDepartments);
router.get('/:id', departmentController.getDepartmentById);
router.put('/:id', authMiddleware, departmentController.updateDepartment);
router.delete('/:id', authMiddleware, departmentController.deleteDepartment);

module.exports = router;
