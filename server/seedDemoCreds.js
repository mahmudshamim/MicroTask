const mongoose = require('mongoose');
require('dotenv').config();

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    role: String,
    image: String,
    coins: { type: Number, default: 0 }
});

const User = mongoose.model('User', UserSchema);

async function seed() {
    try {
        await mongoose.connect(process.env.DB_URI);
        console.log('Connected to MongoDB');

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
                coins: 50
            },
            {
                name: 'Worker User',
                email: 'worker@microtask.com',
                role: 'Worker',
                image: 'https://i.pravatar.cc/150?img=56',
                coins: 10
            }
        ];

        for (const user of demoUsers) {
            await User.findOneAndUpdate(
                { email: user.email },
                user,
                { upsert: true, new: true }
            );
            console.log(`Seeded/Updated user: ${user.email} (${user.role})`);
        }

        console.log('Seeding completed successfully!');
        process.exit();
    } catch (error) {
        console.error('Seeding failed:', error);
        process.exit(1);
    }
}

seed();
