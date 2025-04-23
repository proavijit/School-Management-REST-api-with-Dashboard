const Parent = require('../models/Parent');
const User = require('../models/User'); 

// Create a new parent record
exports.createParent = async (req, res) => {
  try {
    const { name, email, phone, students } = req.body;

    // Check if students exist
    const studentIds = await User.find({ '_id': { $in: students } });
    if (studentIds.length !== students.length) {
      return res.status(404).json({ message: 'Some students not found' });
    }

    const parent = new Parent({
      name,
      email,
      phone,
      students
    });

    await parent.save();
    res.status(201).json({ message: 'Parent created successfully', parent });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all parents
exports.getParents = async (req, res) => {
  try {
    const parents = await Parent.find()
      .populate('students', 'name email'); 

    res.status(200).json(parents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a parent by ID
exports.getParentById = async (req, res) => {
  try {
    const { parentId } = req.params;
    
    const parent = await Parent.findById(parentId)
      .populate('students', 'name email'); 

    if (!parent) return res.status(404).json({ message: 'Parent not found' });
    
    res.status(200).json(parent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a parent's details
exports.updateParent = async (req, res) => {
  try {
    const { parentId } = req.params;
    const { name, email, phone, students } = req.body;

    const parent = await Parent.findByIdAndUpdate(parentId, {
      name,
      email,
      phone,
      students,
      updatedAt: Date.now()
    }, { new: true });

    if (!parent) return res.status(404).json({ message: 'Parent not found' });

    res.status(200).json({ message: 'Parent updated successfully', parent });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a parent
exports.deleteParent = async (req, res) => {
  try {
    const { parentId } = req.params;

    const parent = await Parent.findByIdAndDelete(parentId);
    if (!parent) return res.status(404).json({ message: 'Parent not found' });

    res.status(204).send();  // No content, successful deletion
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
