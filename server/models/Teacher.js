const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  subject: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String },
  profileImage: { type: String },
  isActive: { type: Boolean, default: true }, // To check if the teacher is active or not
}, { timestamps: true });

// You can add methods to the teacher schema if needed
// teacherSchema.methods.someMethod = function() { ... };

module.exports = mongoose.model('Teacher', teacherSchema);
