const express = require('express');
const router = express.Router();
const Withdrawal = require('../models/Withdrawal');
const User = require('../models/User');
const Notification = require('../models/Notification');
const verifyToken = require('../middleware/verifyToken');
const verifyRole = require('../middleware/verifyRole');

// Create Withdrawal Request
router.post('/withdrawals', async (req, res) => {
    try {
        const withdrawal = new Withdrawal(req.body);
        const result = await withdrawal.save();
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// Get Withdrawals by Worker Email
router.get('/withdrawals/:email', async (req, res) => {
    try {
        const result = await Withdrawal.find({ worker_email: req.params.email }).sort({ withdraw_date: -1 });
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// Get Pending Withdrawals (Admin)
router.get('/pending-withdrawals', verifyToken, verifyRole('Admin'), async (req, res) => {
    try {
        const result = await Withdrawal.find({ status: 'pending' }).sort({ withdraw_date: -1 });
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// Approve Withdrawal (Admin)
router.patch('/withdrawals/:id', verifyToken, verifyRole('Admin'), async (req, res) => {
    try {
        const { id } = req.params;
        const withdrawal = await Withdrawal.findById(id);
        
        if (!withdrawal) {
            return res.status(404).send({ message: 'Withdrawal not found' });
        }

        if (withdrawal.status === 'approved') {
            return res.status(400).send({ message: 'Withdrawal already approved' });
        }

        // Update withdrawal status
        await Withdrawal.findByIdAndUpdate(id, { status: 'approved' });

        // Deduct coins from worker
        await User.updateOne(
            { email: withdrawal.worker_email },
            { $inc: { coins: -withdrawal.withdrawal_coin } }
        );

        // Create notification for worker
        const notification = new Notification({
            message: `Your withdrawal request of $${withdrawal.withdrawal_amount.toFixed(2)} has been approved and processed.`,
            toEmail: withdrawal.worker_email,
            actionRoute: '/dashboard/withdrawals',
            time: new Date()
        });
        await notification.save();

        res.send({ message: 'Withdrawal approved successfully' });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

module.exports = router;

