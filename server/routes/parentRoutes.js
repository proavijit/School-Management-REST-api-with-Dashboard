const express = require('express');
const router = express.Router();
const parentController = require('../controllers/parentController');

// Routes for parents
router.post('/', parentController.createParent);
router.get('/', parentController.getParents);
router.get('/:parentId', parentController.getParentById);
router.put('/:parentId', parentController.updateParent);
router.delete('/:parentId', parentController.deleteParent);

module.exports = router;
