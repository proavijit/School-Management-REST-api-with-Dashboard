const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

// Routes for Notifications
router.post('/', notificationController.createNotification);
router.get('/:userId', notificationController.getNotifications);
router.put('/:notificationId/read', notificationController.markAsRead);
router.delete('/:notificationId', notificationController.deleteNotification);

module.exports = router;
