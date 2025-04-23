const Notification = require('../models/Notification');
const User = require('../models/User'); 

// Create Notification
exports.createNotification = async (req, res) => {
  try {
    const { userId, message, type } = req.body;

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const notification = new Notification({
      userId,
      message,
      type
    });

    await notification.save();
    res.status(201).json({ message: 'Notification created successfully', notification });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all Notifications for a User
exports.getNotifications = async (req, res) => {
  try {
    const { userId } = req.params;

    // Fetch notifications for the user
    const notifications = await Notification.find({ userId })
      .sort({ createdAt: -1 }); // Latest first
    res.status(200).json(notifications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Mark Notification as Read
exports.markAsRead = async (req, res) => {
  try {
    const { notificationId } = req.params;

    const notification = await Notification.findById(notificationId);
    if (!notification) return res.status(404).json({ message: 'Notification not found' });

    notification.read = true;
    await notification.save();
    res.status(200).json({ message: 'Notification marked as read', notification });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete Notification
exports.deleteNotification = async (req, res) => {
  try {
    const { notificationId } = req.params;

    const deletedNotification = await Notification.findByIdAndDelete(notificationId);
    if (!deletedNotification) return res.status(404).json({ message: 'Notification not found' });

    res.status(204).send();  
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
