# MicroTask Platform

A comprehensive micro-tasking and earning platform built with the MERN stack, where users can post tasks, complete tasks, and earn money through a coin-based system.

## 🌐 Live Site

- **Frontend**: [https://microtask-mahmud.web.app](https://microtask-mahmud.web.app)
- **Backend**: [https://microtask-server.render.com](https://microtask-server.render.com)

## 👤 Admin Credentials

- **Email**: admin@microtask.com
- **Password**: admin123456

## ✨ Key Features

- **Multi-Role System**: Three distinct user roles - Worker, Buyer, and Admin with role-based access control
- **Task Management**: Buyers can create, update, and delete tasks with detailed requirements and deadlines
- **Task Submission**: Workers can browse available tasks, view details, and submit work for review
- **Coin-Based Economy**: Integrated coin system where Workers earn coins and Buyers purchase coins to post tasks
- **Payment Integration**: Stripe payment gateway for secure coin purchases with multiple package options
- **Withdrawal System**: Workers can withdraw earnings (minimum 200 coins = $10) with multiple payment methods
- **Real-Time Notifications**: Notification system that alerts users about task approvals, rejections, and withdrawals
- **Image Upload**: imgBB integration for seamless image uploads for profile pictures and task images
- **Admin Dashboard**: Comprehensive admin panel to manage users, tasks, and withdrawal requests
- **Responsive Design**: Fully responsive design that works seamlessly on mobile, tablet, and desktop devices
- **Secure Authentication**: Firebase authentication with JWT token-based authorization and role-based middleware
- **Task Review System**: Buyers can review worker submissions, approve or reject them, with automatic coin distribution
- **Payment History**: Complete transaction history for all coin purchases and withdrawals
- **Best Workers Display**: Homepage showcases top 6 workers based on their coin earnings
- **Testimonials Section**: User testimonials displayed in an interactive slider format

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB
- Firebase project
- Stripe account (for payments)
- imgBB API key (for image uploads)

### Installation

#### Client Setup

1. Navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the client directory and add your environment variables (see `.env.example`):
```bash
cp .env.example .env
```

4. Start the development server:
```bash
npm run dev
```

#### Server Setup

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the server directory and add your environment variables (see `.env.example`):
```bash
cp .env.example .env
```

4. Start the server:
```bash
node index.js
```

## 📁 Project Structure

```
assignment13/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── routes/         # Route configuration
│   │   └── utils/          # Utility functions
│   └── package.json
├── server/                 # Express backend
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── middleware/         # Custom middleware
│   └── index.js            # Server entry point
└── README.md
```

## 🔐 Environment Variables

### Client (.env)
- `VITE_apiKey` - Firebase API key
- `VITE_authDomain` - Firebase auth domain
- `VITE_projectId` - Firebase project ID
- `VITE_storageBucket` - Firebase storage bucket
- `VITE_messagingSenderId` - Firebase messaging sender ID
- `VITE_appId` - Firebase app ID
- `VITE_payment_Gateway_PK` - Stripe public key
- `VITE_IMGBB_API_KEY` - imgBB API key

### Server (.env)
- `PORT` - Server port (default: 5000)
- `DB_USER` - MongoDB username
- `DB_PASS` - MongoDB password
- `ACCESS_TOKEN_SECRET` - JWT secret key
- `STRIPE_SECRET_KEY` - Stripe secret key

## 🎯 User Roles

### Worker
- Browse and view available tasks
- Submit task completions
- Track submission status
- Withdraw earnings (minimum 200 coins)
- View earnings and statistics

### Buyer
- Create and manage tasks
- Review worker submissions
- Approve or reject submissions
- Purchase coins via Stripe
- View payment history

### Admin
- Manage all users and their roles
- View platform statistics
- Manage all tasks
- Approve withdrawal requests
- Monitor platform activity

## 💰 Coin System

- **Registration Bonus**: Workers receive 10 coins, Buyers receive 50 coins
- **Coin Purchase**: 10 coins = $1, 150 coins = $10, 500 coins = $20, 1000 coins = $35
- **Withdrawal Rate**: 20 coins = $1 (platform profit margin)
- **Minimum Withdrawal**: 200 coins (equivalent to $10)

## 🛠️ Technologies Used

- **Frontend**: React, React Router, Tailwind CSS, React Query, Swiper
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Authentication**: Firebase Authentication, JWT
- **Payment**: Stripe
- **Image Upload**: imgBB API
- **State Management**: React Context API, React Query

## 📝 License

This project is created for educational purposes.

## 👨‍💻 Developer

Developed by **Mahmud Shamim**

---

**Note**: Make sure to update the admin credentials and live site URLs before deployment.

