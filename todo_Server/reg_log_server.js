import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import { registerUser, loginUser } from './auth.js';
import { verifyToken } from './verifyToken.js';
import dotenv from 'dotenv';

dotenv.config();


const app = express();

// Middleware
app.use(cors()); // Add CORS middleware here
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

// Start the server
const PORT = process.env.PORT_REGISTRATION;
app.listen(PORT, () => {
  console.log(`Server: reg_log_server.js running on port ${PORT}`);
});

