const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    image: {
        type: String,
    },
    role: {
        type: String,
        enum: ['Worker', 'Buyer', 'Admin'],
        required: true,
    },
    coins: {
        type: Number,
        default: 0,
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
