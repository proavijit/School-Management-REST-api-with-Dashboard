const express = require('express');
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} = require('../controllers/user.controllers');

const router = express.Router();

router.get('/', getAllUsers);           // GET all
router.get('/:id', getUserById);        // GET by ID
router.post('/', createUser);           // CREATE
router.patch('/:id', updateUser);       // UPDATE
router.delete('/:id', deleteUser);      // DELETE

module.exports = router;
