const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  dueDate: { type: Date, required: true },
  submission: { type: mongoose.Schema.Types.ObjectId, ref: 'Submission' }
}, { timestamps: true });

module.exports = mongoose.model('Assignment', assignmentSchema);
