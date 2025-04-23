const mongoose = require('mongoose');

const classroomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true }, 
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], 
  createdAt: { type: Date, default: Date.now }, 
  updatedAt: { type: Date, default: Date.now } 
});

module.exports = mongoose.model('Classroom', classroomSchema);
