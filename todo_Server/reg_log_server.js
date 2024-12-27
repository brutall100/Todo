import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import { registerUser, loginUser, User } from './auth.js'; // Correct import for User model
import { verifyToken } from './verifyToken.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  dbName: process.env.DB_NAME,
})
  .then(() => console.log(`Connected to MongoDB database: ${process.env.DB_NAME}: users`))
  .catch(err => console.log('MongoDB connection error: ', err));

// Register and Login routes (public routes)
app.post('/api/auth/register', registerUser);
app.post('/api/auth/login', loginUser);

// Protected route (requires authentication)
app.get('/api/protected', verifyToken, (req, res) => {
  res.json({ message: 'This is a protected route.', user: req.user });
});

// New route to get user profile (protected)
app.get('/api/users/me', verifyToken, async (req, res) => {
  try {
    console.log('User ID:', req.user.id); // Log the user ID to check if it's correct
    const user = await User.findById(req.user.id).select('name email');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Start the server
const PORT = process.env.PORT_REGISTRATION;
app.listen(PORT, () => {
  console.log(`Server: reg_log_server.js running on port ${PORT}`);
});


