const express = require('express');
const router = express.Router();
const Submission = require('../models/Submission');
const Notification = require('../models/Notification');

// Create a Submission
router.post('/submissions', async (req, res) => {
    try {
        const submission = new Submission(req.body);
        const result = await submission.save();
        
        // Create notification for buyer
        const buyerNotification = new Notification({
            message: `${submission.worker_name} has submitted a task: ${submission.task_title}`,
            toEmail: submission.buyer_email,
            actionRoute: '/dashboard/task-to-review',
            time: new Date()
        });
        await buyerNotification.save();
        
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

const User = require('../models/User');

// Get Submissions for a Buyer (Task owner)
router.get('/buyer-submissions', async (req, res) => {
    try {
        const buyer_email = req.query.email;
        if (!buyer_email) return res.status(400).send({ message: "Email required" });

        const result = await Submission.find({ buyer_email, status: 'pending' }).sort({ submitted_at: -1 }); // Only pending for 'Task To Review'
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// Approve or Reject Submission
router.patch('/submissions/:id', async (req, res) => {
    try {
        const { status } = req.body;
        const id = req.params.id;
        const submission = await Submission.findById(id);

        if (status === 'approved') {
            // Pay the worker
            await User.updateOne(
                { email: submission.worker_email },
                { $inc: { coins: submission.payable_amount } }
            );
            
            // Create notification for worker
            const workerNotification = new Notification({
                message: `You have earned ${submission.payable_amount} coins from ${submission.buyer_name} for completing ${submission.task_title}`,
                toEmail: submission.worker_email,
                actionRoute: '/dashboard/worker-home',
                time: new Date()
            });
            await workerNotification.save();
        }
        else if (status === 'rejected') {
            // Need to import Task to increase required_workers? No, can do updateMany or just update Task
            // "Increase required_workers by 1"
            // Wait, I need Task model here.
            // Circular dependency if I require Task Routes? No, require Model.
            const Task = require('../models/Task');
            await Task.updateOne({ _id: submission.task_id }, { $inc: { required_workers: 1 } });
            
            // Create notification for worker
            const workerNotification = new Notification({
                message: `Your submission for ${submission.task_title} has been rejected by ${submission.buyer_name}`,
                toEmail: submission.worker_email,
                actionRoute: '/dashboard/my-submissions',
                time: new Date()
            });
            await workerNotification.save();
        }

        const result = await Submission.findByIdAndUpdate(id, { status }, { new: true });
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// Get Submissions for a Worker
router.get('/submissions', async (req, res) => {
    try {
        const worker_email = req.query.email;
        if (!worker_email) return res.status(400).send({ message: "Email required" });

        const result = await Submission.find({ worker_email }).sort({ submitted_at: -1 });
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

module.exports = router;
