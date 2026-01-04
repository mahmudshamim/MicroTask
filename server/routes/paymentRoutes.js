const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const User = require('../models/User');
const Payment = require('../models/Payment');

// Create Payment Intent
router.post('/create-payment-intent', async (req, res) => {
    try {
        const { price } = req.body;
        const amount = parseInt(price * 100);

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: 'usd',
            payment_method_types: ['card']
        });

        res.send({
            clientSecret: paymentIntent.client_secret
        });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// Save Payment Info and Add Coins
router.post('/payments', async (req, res) => {
    try {
        const paymentData = req.body;
        const payment = new Payment(paymentData);
        await payment.save();

        // Add coins to user
        const result = await User.updateOne(
            { email: paymentData.email },
            { $inc: { coins: paymentData.coins } }
        );

        res.send(result);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// Get Payments by Email
router.get('/payments/:email', async (req, res) => {
    try {
        const result = await Payment.find({ email: req.params.email }).sort({ date: -1 });
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

module.exports = router;
