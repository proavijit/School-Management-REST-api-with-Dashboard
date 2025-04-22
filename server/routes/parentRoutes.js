const express = require('express');
const router = express.Router();
const parentController = require('../controllers/parentController');

// Routes for parents
router.post('/', parentController.createParent);  // Create a new parent
router.get('/', parentController.getParents);  // Get all parents
router.get('/:parentId', parentController.getParentById);  // Get a specific parent by ID
router.put('/:parentId', parentController.updateParent);  // Update parent details
router.delete('/:parentId', parentController.deleteParent);  // Delete a parent

module.exports = router;
