const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to verify Token (can be moved to separate file later)
// actually we will use the one in index.js or move it here. 
// For now, let's keep routes specific logic here.

// Save or Update User
router.post('/users/:email', async (req, res) => {
    const email = req.params.email;
    const query = { email: email };
    const user = req.body;

    // Check if user exists
    const isExist = await User.findOne(query);

    if (isExist) {
        return res.send(isExist);
    }

    // Default coin logic
    let initialCoins = 0;
    if (user.role === 'Worker') initialCoins = 10;
    if (user.role === 'Buyer') initialCoins = 50;

    const newUser = new User({
        ...user,
        coins: initialCoins,
        timestamp: Date.now()
    });

    const result = await newUser.save();
    res.send(result);
});

// Get User by Email
router.get('/users/:email', async (req, res) => {
    const email = req.params.email;
    const result = await User.findOne({ email });
    res.send(result);
});

// Create JWT Token
router.post('/jwt', async (req, res) => {
    const user = req.body;
    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
    res.send({ token });
});

// Get Best Workers
router.get('/best-workers', async (req, res) => {
    try {
        console.log('Hit /best-workers route');
        const result = await User.find({ role: 'Worker' }).sort({ coins: -1 }).limit(6);
        console.log('Query successful, found:', result.length);
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});


module.exports = router;
