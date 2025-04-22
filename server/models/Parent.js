const mongoose = require('mongoose');

const parentSchema = new mongoose.Schema({
  name: { type: String, required: true },  // Parent's name
  email: { type: String, required: true, unique: true },  // Parent's email address
  phone: { type: String, required: true },  // Parent's phone number
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],  // List of students that the parent is associated with
  createdAt: { type: Date, default: Date.now },  // Date when the parent record was created
  updatedAt: { type: Date, default: Date.now }  // Date when the parent record was last updated
});

module.exports = mongoose.model('Parent', parentSchema);
