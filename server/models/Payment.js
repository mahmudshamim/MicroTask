const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    email: { type: String, required: true },
    price: { type: Number, required: true },
    transactionId: { type: String, required: true },
    coins: { type: Number, required: true },
    date: { type: Date, default: Date.now }
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
