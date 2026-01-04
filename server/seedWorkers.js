require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const sampleWorkers = [
    {
        name: 'Sarah Johnson',
        email: 'sarah.johnson@example.com',
        image: 'https://randomuser.me/api/portraits/women/1.jpg',
        role: 'Worker',
        coins: 15420,
    },
    {
        name: 'Michael Chen',
        email: 'michael.chen@example.com',
        image: 'https://randomuser.me/api/portraits/men/2.jpg',
        role: 'Worker',
        coins: 12890,
    },
    {
        name: 'Emily Davis',
        email: 'emily.davis@example.com',
        image: 'https://randomuser.me/api/portraits/women/3.jpg',
        role: 'Worker',
        coins: 11250,
    },
    {
        name: 'James Wilson',
        email: 'james.wilson@example.com',
        image: 'https://randomuser.me/api/portraits/men/4.jpg',
        role: 'Worker',
        coins: 9870,
    },
    {
        name: 'Sophia Martinez',
        email: 'sophia.martinez@example.com',
        image: 'https://randomuser.me/api/portraits/women/5.jpg',
        role: 'Worker',
        coins: 8540,
    },
    {
        name: 'Daniel Brown',
        email: 'daniel.brown@example.com',
        image: 'https://randomuser.me/api/portraits/men/6.jpg',
        role: 'Worker',
        coins: 7230,
    },
];

async function seedDatabase() {
    try {
        await mongoose.connect(process.env.DB_URI);
        console.log('MongoDB Connected');

        // Check if workers already exist
        const existingWorkers = await User.countDocuments({ role: 'Worker' });

        if (existingWorkers > 0) {
            console.log(`Database already has ${existingWorkers} workers. Skipping seed.`);
            process.exit(0);
        }

        await User.insertMany(sampleWorkers);
        console.log('✅ Sample workers created successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}

seedDatabase();
