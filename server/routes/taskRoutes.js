const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const Submission = require('../models/Submission'); // For related checks if needed

// Get all tasks (Available for workers: required_workers > 0)
router.get('/tasks', async (req, res) => {
    try {
        const result = await Task.find({ required_workers: { $gt: 0 } }).sort({ created_at: -1 });
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// Get single task by ID
router.get('/tasks/:id', async (req, res) => {
    try {
        const result = await Task.findById(req.params.id);
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

const User = require('../models/User');

// Create a Task (Buyer)
router.post('/tasks', async (req, res) => {
    try {
        const task = new Task(req.body);
        const { buyer_email, required_workers, payable_amount } = req.body;
        const totalCost = required_workers * payable_amount;

        // Check user coins
        const user = await User.findOne({ email: buyer_email });
        if (user.coins < totalCost) {
            return res.status(400).send({ message: "Not enough coins. Please Purchase Coin." });
        }

        // Deduct coins
        await User.updateOne({ email: buyer_email }, { $inc: { coins: -totalCost } });

        const result = await task.save();
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// Get Tasks by Buyer Email
router.get('/my-tasks/:email', async (req, res) => {
    try {
        const result = await Task.find({ buyer_email: req.params.email }).sort({ created_at: -1 });
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// Update Task
router.patch('/tasks/:id', async (req, res) => {
    try {
        const result = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// Delete Task (Refund Logic)
router.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        const { buyer_email, required_workers, payable_amount } = task;
        const refundAmount = required_workers * payable_amount;

        // Refund coins
        await User.updateOne({ email: buyer_email }, { $inc: { coins: refundAmount } });

        const result = await Task.findByIdAndDelete(req.params.id);
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

const Payment = require('../models/Payment');

// Buyer Stats
router.get('/buyer-stats/:email', async (req, res) => {
    try {
        const email = req.params.email;
        const taskCount = await Task.countDocuments({ buyer_email: email });

        const pendingTasks = await Task.find({ buyer_email: email });
        const totalPendingWorkers = pendingTasks.reduce((acc, curr) => acc + curr.required_workers, 0);

        const payments = await Payment.find({ email: email });
        const totalPayment = payments.reduce((acc, curr) => acc + curr.price, 0);

        res.send({
            taskCount,
            totalPendingWorkers,
            totalPayment
        });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

module.exports = router;
