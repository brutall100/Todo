import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// User schema for registration
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Name is required
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure email is unique
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model('User', userSchema);

// Register user
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already registered' });
    }

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: await bcrypt.hash(password, 10), // Hash password before storing it
    });

    await newUser.save(); // Save the user to the database
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ token, user: newUser }); // Return the token and user data
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Login user
const loginUser = async (req, res) => {
  const { identifier, password } = req.body;

  try {
    let user;
    if (/\S+@\S+\.\S+/.test(identifier)) {
      // Check if identifier is an email
      user = await User.findOne({ email: identifier });
    } else {
      // Check if identifier is a name
      user = await User.findOne({ name: identifier });
    }

    if (!user) {
      return res.status(400).json({ message: 'Invalid email/name or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email/name or password' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export { registerUser, loginUser, User };  // Export User model


