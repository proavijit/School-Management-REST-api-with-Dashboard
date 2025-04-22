const Grade = require('../models/Grade');
const Exam = require('../models/Exam');
const Student = require('../models/Student'); // Assuming you have a Student model

// Create Grade
exports.createGrade = async (req, res) => {
  try {
    const { studentId, examId, marksObtained } = req.body;

    // Find the exam to get total marks
    const exam = await Exam.findById(examId);
    if (!exam) return res.status(404).json({ message: 'Exam not found' });

    // Find the student
    const student = await Student.findById(studentId);
    if (!student) return res.status(404).json({ message: 'Student not found' });

    // Calculate grade
    const grade = calculateGrade(marksObtained, exam.totalMarks);

    const gradeRecord = new Grade({
      studentId,
      examId,
      marksObtained,
      totalMarks: exam.totalMarks,
      grade
    });

    await gradeRecord.save();
    res.status(201).json({ message: 'Grade created successfully', gradeRecord });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all Grades
exports.getGrades = async (req, res) => {
  try {
    const grades = await Grade.find().populate('studentId examId');
    res.status(200).json(grades);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Grade by ID
exports.getGradeById = async (req, res) => {
  try {
    const { gradeId } = req.params;

    const grade = await Grade.findById(gradeId).populate('studentId examId');
    if (!grade) return res.status(404).json({ message: 'Grade not found' });

    res.status(200).json(grade);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Grade
exports.updateGrade = async (req, res) => {
  try {
    const { gradeId } = req.params;
    const { marksObtained } = req.body;

    const grade = await Grade.findById(gradeId);
    if (!grade) return res.status(404).json({ message: 'Grade not found' });

    // Update the marks and recalculate the grade
    const exam = await Exam.findById(grade.examId);
    const newGrade = calculateGrade(marksObtained, exam.totalMarks);

    grade.marksObtained = marksObtained;
    grade.grade = newGrade;

    await grade.save();
    res.status(200).json(grade);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete Grade
exports.deleteGrade = async (req, res) => {
  try {
    const { gradeId } = req.params;

    const deletedGrade = await Grade.findByIdAndDelete(gradeId);
    if (!deletedGrade) return res.status(404).json({ message: 'Grade not found' });

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Helper function to calculate grade based on marks
function calculateGrade(marksObtained, totalMarks) {
  const percentage = (marksObtained / totalMarks) * 100;
  if (percentage >= 90) return 'A';
  if (percentage >= 80) return 'B';
  if (percentage >= 70) return 'C';
  if (percentage >= 60) return 'D';
  return 'F'; // Fail
}
