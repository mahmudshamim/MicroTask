const mongoose = require('mongoose');
require('dotenv').config();
const Task = require('./models/Task');
const User = require('./models/User');
const Submission = require('./models/Submission');
const Notification = require('./models/Notification');

async function seed() {
    try {
        await mongoose.connect(process.env.DB_URI);
        console.log('Connected to MongoDB');

        // 1. Update/Add Demo Users with coins
        const demoUsers = [
            {
                name: 'Admin User',
                email: 'admin@microtask.com',
                role: 'Admin',
                image: 'https://i.pravatar.cc/150?img=33',
                coins: 0
            },
            {
                name: 'Buyer User',
                email: 'buyer@microtask.com',
                role: 'Buyer',
                image: 'https://i.pravatar.cc/150?img=11',
                coins: 500
            },
            {
                name: 'Worker User',
                email: 'worker@microtask.com',
                role: 'Worker',
                image: 'https://i.pravatar.cc/150?img=56',
                coins: 250
            }
        ];

        for (const user of demoUsers) {
            await User.findOneAndUpdate({ email: user.email }, user, { upsert: true });
        }
        console.log('Users seeded');

        // 2. Add Demo Tasks
        await Task.deleteMany({}); // Clear existing tasks for clean demo
        const tasks = [
            {
                task_title: 'Translate English to Bengali',
                task_detail: 'Translate a short story from English to Bengali. Must be natural and fluent.',
                required_workers: 5,
                payable_amount: 15,
                completion_date: new Date('2026-02-01'),
                submission_info: 'Submit the translated PDF or Google Doc link.',
                task_image_url: 'https://images.unsplash.com/photo-1543165796-5426273eaec3?w=800',
                buyer_email: 'buyer@microtask.com',
                buyer_name: 'Buyer User'
            },
            {
                task_title: 'Logo Design for Startup',
                task_detail: 'Create a minimalist logo for a tech startup. Provide 3 concepts.',
                required_workers: 2,
                payable_amount: 100,
                completion_date: new Date('2026-01-15'),
                submission_info: 'Upload logo files in PNG and SVG format.',
                task_image_url: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800',
                buyer_email: 'buyer@microtask.com',
                buyer_name: 'Buyer User'
            },
            {
                task_title: 'Data Entry - Excel',
                task_detail: 'Enter 500 rows of product data into the provided Excel sheet.',
                required_workers: 10,
                payable_amount: 20,
                completion_date: new Date('2026-01-10'),
                submission_info: 'Upload the completed Excel file.',
                task_image_url: 'https://images.unsplash.com/photo-1586281380349-63253b97418b?w=800',
                buyer_email: 'buyer@microtask.com',
                buyer_name: 'Buyer User'
            },
            {
                task_title: 'Social Media Engagement',
                task_detail: 'Like and share 5 posts on our official Facebook page.',
                required_workers: 50,
                payable_amount: 5,
                completion_date: new Date('2026-01-20'),
                submission_info: 'Provide screenshots of likes and shares.',
                task_image_url: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800',
                buyer_email: 'buyer@microtask.com',
                buyer_name: 'Buyer User'
            },
            {
                task_title: 'Product Review Writing',
                task_detail: 'Write a 200-word honest review for our new headphone model.',
                required_workers: 20,
                payable_amount: 10,
                completion_date: new Date('2026-01-25'),
                submission_info: 'Paste the review text here.',
                task_image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
                buyer_email: 'buyer@microtask.com',
                buyer_name: 'Buyer User'
            }
        ];
        const savedTasks = await Task.insertMany(tasks);
        console.log('Tasks seeded');

        // 3. Add Demo Submissions for Worker
        await Submission.deleteMany({});
        const submissions = [
            {
                task_id: savedTasks[0]._id,
                task_title: savedTasks[0].task_title,
                payable_amount: savedTasks[0].payable_amount,
                worker_email: 'worker@microtask.com',
                worker_name: 'Worker User',
                buyer_email: 'buyer@microtask.com',
                buyer_name: 'Buyer User',
                submission_details: 'Here is my translation: https://docs.google.com/document/d/demo',
                status: 'approved'
            },
            {
                task_id: savedTasks[2]._id,
                task_title: savedTasks[2].task_title,
                payable_amount: savedTasks[2].payable_amount,
                worker_email: 'worker@microtask.com',
                worker_name: 'Worker User',
                buyer_email: 'buyer@microtask.com',
                buyer_name: 'Buyer User',
                submission_details: 'Excel sheet uploaded. Completed all 500 rows.',
                status: 'pending'
            }
        ];
        await Submission.insertMany(submissions);
        console.log('Submissions seeded');

        // 4. Add Demo Notifications
        await Notification.deleteMany({});
        const notifications = [
            {
                message: 'Your submission for "Translate English to Bengali" has been approved!',
                toEmail: 'worker@microtask.com',
                actionRoute: '/dashboard/my-submissions',
                time: new Date()
            },
            {
                message: 'New task available: Social Media Engagement',
                toEmail: 'worker@microtask.com',
                actionRoute: '/dashboard/task-list',
                time: new Date()
            }
        ];
        await Notification.insertMany(notifications);
        console.log('Notifications seeded');

        console.log('Full demo data seeding completed!');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

seed();
