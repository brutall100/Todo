require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

app.use(cors());
app.use(express.json()); 

const mongoURI = process.env.MONGO_URI;
const dbName = process.env.DB_NAME;

mongoose.connect(process.env.MONGO_URI, {
  dbName: process.env.DB_NAME,
})
  .then(() => console.log(`Connected to MongoDB database: ${process.env.DB_NAME}: todos`))
  .catch((error) => console.error('Error connecting to MongoDB:', error));


// Todo model definition (mongoose schema)
const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
});

const Todo = mongoose.model('Todo', todoSchema);

//// GET /api/todos - Retrieve all todos
app.get('/api/todos', async (req, res) => {
  try {
    const todos = await Todo.find(); 
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
  console.log(`Server: server.js is running at ${PORT}`);
});


// npm run dev
// paleidzia visus serverius