require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

app.use(cors());
app.use(express.json()); 

const mongoURI = process.env.MONGO_URI;
const dbName = process.env.DB_NAME;

mongoose.connect(mongoURI, { dbName, useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log(`Connected to MongoDB database: ${dbName}`);
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });

// Todo model definition (mongoose schema)
const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
});

const Todo = mongoose.model('Todo', todoSchema);

//// GET /api/todos - Retrieve all todos
app.get('/api/todos', async (req, res) => {
  try {
    const todos = await Todo.find(); // Fetch all todos from MongoDB
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
});

//// POST /api/todos - Add a new todo
app.post('/api/todos', async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ error: 'Title and description are required' });
  }

  const newTodo = new Todo({
    title,
    description,
  });

  try {
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add todo' });
  }
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
