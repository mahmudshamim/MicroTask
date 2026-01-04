const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const morgan = require('morgan')
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
const corsOptions = {
  origin: [
    'http://localhost:5173',
    'http://localhost:5174',
    'https://assignment13-cdc52.web.app',
    'https://assignment13-cdc52.firebaseapp.com'
  ],
  credentials: true,
  optionSuccessStatus: 200,
}
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'))

// Connect to MongoDB using Mongoose
console.log('Connecting to MongoDB...');
mongoose.connect(process.env.DB_URI, {
  serverSelectionTimeoutMS: 3000,
  maxPoolSize: 10,
})
  .then(() => console.log('MongoDB Connected Successfully'))
  .catch(err => {
    console.error('MongoDB Connection Failed:', err.message);
  });

// Routes
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const submissionRoutes = require('./routes/submissionRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const withdrawalRoutes = require('./routes/withdrawalRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const adminRoutes = require('./routes/adminRoutes');

app.use(authRoutes);
app.use(taskRoutes);
app.use(submissionRoutes);
app.use(paymentRoutes);
app.use(withdrawalRoutes);
app.use(notificationRoutes);
app.use(adminRoutes);

app.get('/', (req, res) => {
  res.send('Micro-Task Platform Server is running');
});

// Vercel handles the server start, but for local development:
if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

// IMPORTANT: This line is required for Vercel to work
module.exports = app;
