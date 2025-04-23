const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  examDate: { type: Date, required: true },
  duration: { type: Number, required: true },
  totalMarks: { type: Number, required: true },
  passingMarks: { type: Number, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true }, 
}, { timestamps: true });

module.exports = mongoose.model('Exam', examSchema);
