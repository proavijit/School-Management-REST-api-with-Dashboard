const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  subject: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String },
  profileImage: { type: String },
  isActive: { type: Boolean, default: true }, 
}, { timestamps: true });


module.exports = mongoose.model('Teacher', teacherSchema);
