const Assignment = require('../models/Assignment');
const Submission = require('../models/Submission');
const Student = require('../models/Student'); // Assuming you have a Student model

// Create Assignment
exports.createAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.create(req.body);
    res.status(201).json(assignment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get All Assignments
exports.getAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find().populate('course student submission');
    res.status(200).json(assignments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Assignment By ID
exports.getAssignmentById = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id).populate('course student submission');
    if (!assignment) return res.status(404).json({ message: 'Assignment not found' });
    res.status(200).json(assignment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Assignment
exports.updateAssignment = async (req, res) => {
  try {
    const updatedAssignment = await Assignment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedAssignment) return res.status(404).json({ message: 'Assignment not found' });
    res.status(200).json(updatedAssignment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete Assignment
exports.deleteAssignment = async (req, res) => {
  try {
    const deletedAssignment = await Assignment.findByIdAndDelete(req.params.id);
    if (!deletedAssignment) return res.status(404).json({ message: 'Assignment not found' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Submit Assignment
exports.submitAssignment = async (req, res) => {
  try {
    const { assignmentId, studentId, submissionData } = req.body;

    // Find the assignment and student
    const assignment = await Assignment.findById(assignmentId);
    const student = await Student.findById(studentId);

    if (!assignment || !student) {
      return res.status(404).json({ message: 'Assignment or Student not found' });
    }

    // Create a submission
    const submission = new Submission({
      assignment: assignmentId,
      student: studentId,
      submissionData,
      submittedAt: Date.now(),
    });

    // Save the submission
    await submission.save();

    // Link the submission to the assignment
    assignment.submission = submission._id;
    await assignment.save();

    res.status(201).json({ message: 'Assignment submitted successfully', submission });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
