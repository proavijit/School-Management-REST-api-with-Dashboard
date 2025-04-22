const Classroom = require('../models/Classroom');
const User = require('../models/User');  // Assuming a User model exists

// Create a new classroom
exports.createClassroom = async (req, res) => {
  try {
    const { name, description, teacherId, students } = req.body;

    // Check if the teacher exists
    const teacher = await User.findById(teacherId);
    if (!teacher) return res.status(404).json({ message: 'Teacher not found' });

    // Create a new classroom
    const classroom = new Classroom({
      name,
      description,
      teacherId,
      students
    });

    await classroom.save();
    res.status(201).json({ message: 'Classroom created successfully', classroom });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all classrooms
exports.getClassrooms = async (req, res) => {
  try {
    const classrooms = await Classroom.find()
      .populate('teacherId', 'name email')  // Populate teacher details
      .populate('students', 'name email');  // Populate student details

    res.status(200).json(classrooms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a classroom by ID
exports.getClassroomById = async (req, res) => {
  try {
    const { classroomId } = req.params;
    
    const classroom = await Classroom.findById(classroomId)
      .populate('teacherId', 'name email')  // Populate teacher details
      .populate('students', 'name email');  // Populate student details

    if (!classroom) return res.status(404).json({ message: 'Classroom not found' });
    
    res.status(200).json(classroom);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a classroom
exports.updateClassroom = async (req, res) => {
  try {
    const { classroomId } = req.params;
    const { name, description, students } = req.body;

    const classroom = await Classroom.findByIdAndUpdate(classroomId, {
      name,
      description,
      students,
      updatedAt: Date.now()
    }, { new: true });

    if (!classroom) return res.status(404).json({ message: 'Classroom not found' });

    res.status(200).json({ message: 'Classroom updated successfully', classroom });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a classroom
exports.deleteClassroom = async (req, res) => {
  try {
    const { classroomId } = req.params;

    const classroom = await Classroom.findByIdAndDelete(classroomId);
    if (!classroom) return res.status(404).json({ message: 'Classroom not found' });

    res.status(204).send();  // No content, successful deletion
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
