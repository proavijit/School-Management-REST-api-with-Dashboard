const Attendance = require('../models/Attendance');
const Student = require('../models/Student');

// Create Attendance Record
exports.createAttendance = async (req, res) => {
  try {
    const { studentId, classDate, status } = req.body;

    // Find student
    const student = await Student.findById(studentId);
    if (!student) return res.status(404).json({ message: 'Student not found' });

    const attendance = new Attendance({
      student: studentId,
      classDate,
      status,
    });

    await attendance.save();
    res.status(201).json({ message: 'Attendance recorded successfully', attendance });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get All Attendance Records
exports.getAttendances = async (req, res) => {
  try {
    const attendances = await Attendance.find().populate('student');
    res.status(200).json(attendances);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Attendance for a Specific Student
exports.getAttendanceByStudent = async (req, res) => {
  try {
    const { studentId } = req.params;

    const attendances = await Attendance.find({ student: studentId }).populate('student');
    if (attendances.length === 0) return res.status(404).json({ message: 'No attendance found for this student' });

    res.status(200).json(attendances);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Attendance for a Specific Class (Date)
exports.getAttendanceByDate = async (req, res) => {
  try {
    const { classDate } = req.params;

    const attendances = await Attendance.find({ classDate }).populate('student');
    if (attendances.length === 0) return res.status(404).json({ message: 'No attendance records for this class date' });

    res.status(200).json(attendances);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Attendance Status
exports.updateAttendanceStatus = async (req, res) => {
  try {
    const { attendanceId } = req.params;
    const { status } = req.body;

    const updatedAttendance = await Attendance.findByIdAndUpdate(attendanceId, { status }, { new: true });
    if (!updatedAttendance) return res.status(404).json({ message: 'Attendance not found' });

    res.status(200).json(updatedAttendance);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete Attendance Record
exports.deleteAttendance = async (req, res) => {
  try {
    const { attendanceId } = req.params;

    const deletedAttendance = await Attendance.findByIdAndDelete(attendanceId);
    if (!deletedAttendance) return res.status(404).json({ message: 'Attendance not found' });

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
