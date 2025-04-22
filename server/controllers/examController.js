const Exam = require('../models/Exam');
const Teacher = require('../models/Teacher'); // Assuming you have a Teacher model

// Create Exam
exports.createExam = async (req, res) => {
  try {
    const { subject, examDate, duration, totalMarks, passingMarks, teacherId } = req.body;

    // Find teacher who created the exam
    const teacher = await Teacher.findById(teacherId);
    if (!teacher) return res.status(404).json({ message: 'Teacher not found' });

    const exam = new Exam({
      subject,
      examDate,
      duration,
      totalMarks,
      passingMarks,
      createdBy: teacherId,
    });

    await exam.save();
    res.status(201).json({ message: 'Exam created successfully', exam });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get All Exams
exports.getExams = async (req, res) => {
  try {
    const exams = await Exam.find().populate('createdBy');
    res.status(200).json(exams);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Exam by ID
exports.getExamById = async (req, res) => {
  try {
    const { examId } = req.params;

    const exam = await Exam.findById(examId).populate('createdBy');
    if (!exam) return res.status(404).json({ message: 'Exam not found' });

    res.status(200).json(exam);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Exam
exports.updateExam = async (req, res) => {
  try {
    const { examId } = req.params;
    const { subject, examDate, duration, totalMarks, passingMarks } = req.body;

    const updatedExam = await Exam.findByIdAndUpdate(examId, {
      subject,
      examDate,
      duration,
      totalMarks,
      passingMarks
    }, { new: true });

    if (!updatedExam) return res.status(404).json({ message: 'Exam not found' });

    res.status(200).json(updatedExam);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete Exam
exports.deleteExam = async (req, res) => {
  try {
    const { examId } = req.params;

    const deletedExam = await Exam.findByIdAndDelete(examId);
    if (!deletedExam) return res.status(404).json({ message: 'Exam not found' });

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
