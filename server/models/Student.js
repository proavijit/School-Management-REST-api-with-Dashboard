const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  rollNo: { type: String, required: true, unique: true },
  department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Parent' }
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);