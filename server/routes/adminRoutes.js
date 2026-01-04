const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Task = require('../models/Task');
const Payment = require('../models/Payment');
const Withdrawal = require('../models/Withdrawal');
const verifyToken = require('../middleware/verifyToken');
const verifyRole = require('../middleware/verifyRole');

// Admin Stats
router.get('/admin-stats', verifyToken, verifyRole('Admin'), async (req, res) => {
    try {
        const totalWorkers = await User.countDocuments({ role: 'Worker' });
        const totalBuyers = await User.countDocuments({ role: 'Buyer' });
        
        const users = await User.find({});
        const totalCoins = users.reduce((acc, user) => acc + (user.coins || 0), 0);
        
        const payments = await Payment.find({});
        const totalPayments = payments.reduce((acc, payment) => acc + (payment.price || 0), 0);

        res.send({
            totalWorkers,
            totalBuyers,
            totalCoins,
            totalPayments
        });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// Get All Users
router.get('/admin/users', verifyToken, verifyRole('Admin'), async (req, res) => {
    try {
        const result = await User.find({}).sort({ name: 1 });
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// Update User Role
router.patch('/admin/users/:id', verifyToken, verifyRole('Admin'), async (req, res) => {
    try {
        const { role } = req.body;
        if (!['Worker', 'Buyer', 'Admin'].includes(role)) {
            return res.status(400).send({ message: 'Invalid role' });
        }
        const result = await User.findByIdAndUpdate(
            req.params.id,
            { role },
            { new: true }
        );
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// Delete User
router.delete('/admin/users/:id', verifyToken, verifyRole('Admin'), async (req, res) => {
    try {
        const result = await User.findByIdAndDelete(req.params.id);
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// Get All Tasks
router.get('/admin/tasks', verifyToken, verifyRole('Admin'), async (req, res) => {
    try {
        const result = await Task.find({}).sort({ created_at: -1 });
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// Delete Task (Admin)
router.delete('/admin/tasks/:id', verifyToken, verifyRole('Admin'), async (req, res) => {
    try {
        const result = await Task.findByIdAndDelete(req.params.id);
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// Get Pending Withdrawals (already in withdrawalRoutes, but adding here for admin access)
// This endpoint already exists in withdrawalRoutes.js as /pending-withdrawals

module.exports = router;

