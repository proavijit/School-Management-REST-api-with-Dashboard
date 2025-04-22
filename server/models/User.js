const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');  // For password hashing

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
}, { timestamps: true });

// Pre-save hook to hash the password before saving the user
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Method to check if password matches
userSchema.methods.matchPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

// ✅ Fix OverwriteModelError
module.exports = mongoose.models.User || mongoose.model('User', userSchema);
