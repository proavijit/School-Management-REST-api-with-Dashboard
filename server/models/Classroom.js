const mongoose = require('mongoose');

const classroomSchema = new mongoose.Schema({
  name: { type: String, required: true },  // Classroom name
  description: { type: String, required: true },  // Classroom description
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Teacher assigned to the classroom
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],  // List of students in the classroom
  createdAt: { type: Date, default: Date.now },  // Date when the classroom was created
  updatedAt: { type: Date, default: Date.now }  // Date when the classroom was last updated
});

module.exports = mongoose.model('Classroom', classroomSchema);
