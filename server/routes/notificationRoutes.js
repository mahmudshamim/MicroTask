const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');

// Create Notification
router.post('/notifications', async (req, res) => {
    try {
        const notification = new Notification(req.body);
        const result = await notification.save();
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// Get Notifications by Email (sorted descending by time)
router.get('/notifications/:email', async (req, res) => {
    try {
        const result = await Notification.find({ toEmail: req.params.email })
            .sort({ time: -1 });
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// Mark Notification as Read
router.patch('/notifications/:id', async (req, res) => {
    try {
        const result = await Notification.findByIdAndUpdate(
            req.params.id,
            { isRead: true },
            { new: true }
        );
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

module.exports = router;

