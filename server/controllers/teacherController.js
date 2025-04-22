const Teacher = require('../models/Teacher');

// Create a new teacher
exports.createTeacher = async (req, res) => {
  const { name, email, subject, phone, address, profileImage } = req.body;

  try {
    // Check if teacher already exists
    const teacherExists = await Teacher.findOne({ email });

    if (teacherExists) {
      return res.status(400).json({ message: 'Teacher with this email already exists.' });
    }

    // Create a new teacher
    const teacher = new Teacher({ name, email, subject, phone, address, profileImage });
    await teacher.save();

    res.status(201).json({
      message: 'Teacher created successfully.',
      teacher,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all teachers
exports.getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.status(200).json(teachers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single teacher by ID
exports.getTeacherById = async (req, res) => {
  const { id } = req.params;

  try {
    const teacher = await Teacher.findById(id);

    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found.' });
    }

    res.status(200).json(teacher);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update teacher details
exports.updateTeacher = async (req, res) => {
  const { id } = req.params;
  const { name, email, subject, phone, address, profileImage, isActive } = req.body;

  try {
    const teacher = await Teacher.findByIdAndUpdate(id, {
      name,
      email,
      subject,
      phone,
      address,
      profileImage,
      isActive,
    }, { new: true });

    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found.' });
    }

    res.status(200).json({
      message: 'Teacher updated successfully.',
      teacher,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a teacher
exports.deleteTeacher = async (req, res) => {
  const { id } = req.params;

  try {
    const teacher = await Teacher.findByIdAndDelete(id);

    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found.' });
    }

    res.status(200).json({
      message: 'Teacher deleted successfully.',
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
