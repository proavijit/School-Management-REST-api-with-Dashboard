const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

// Routes for Notifications
router.post('/', notificationController.createNotification);      // Create a new Notification
router.get('/:userId', notificationController.getNotifications);   // Get all Notifications for a User
router.put('/:notificationId/read', notificationController.markAsRead);  // Mark Notification as Read
router.delete('/:notificationId', notificationController.deleteNotification); // Delete Notification

module.exports = router;
