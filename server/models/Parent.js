const mongoose = require('mongoose');

const parentSchema = new mongoose.Schema({
  name: { type: String, required: true }, 
  email: { type: String, required: true, unique: true },  
  phone: { type: String, required: true }, 
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], 
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now } 
});

module.exports = mongoose.model('Parent', parentSchema);
