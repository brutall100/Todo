import Header from '../../components/Header/Header';
import TodoList from '../../components/TodoList/TodoList';
import TodoForm from '../../components/TodoForm/TodoForm';
import { API_URL } from '../../config/Api_URL';
import './HomePage.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function HomePage() {
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);

  // Fetch Todos from the API
  const fetchTodos = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/todos`);
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching data from server:', error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Handle adding a new todo (POST request)
  const handleAddTodo = async (title, description) => {
    const newTodo = {
      title: title,
      description: description,
      done: false, // Mark as not done initially
    };

    try {
      const response = await axios.post(`${API_URL}/api/todos`, newTodo);
      setTodos((previousTodos) => [...previousTodos, response.data]);
    } catch (error) {
      console.error('Error adding new task:', error);
    }
  };

// Handle editing an existing todo (PUT request)
const handleEditTodo = async (id, title, description) => {
  const updatedTodo = { title, description };
  try {
    await axios.put(`${API_URL}/api/todos/${id}`, updatedTodo);
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, title, description } : todo
    );
    setTodos(updatedTodos);
    setEditingTodo(null); // Reset editing mode after save
  } catch (error) {
    console.error('Error updating task:', error);
  }
};

// Handle marking a todo as done or undone (PATCH request)
const handleMarkAsDone = async (id) => {
  try {
    const todoToUpdate = todos.find((todo) => todo.id === id);
    const updatedTodo = { ...todoToUpdate, done: !todoToUpdate.done };

    // Sending PATCH request with the updated 'done' status
    await axios.patch(`${API_URL}/api/todos/${id}`, { done: updatedTodo.done });

    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, done: updatedTodo.done } : todo
    );
    setTodos(updatedTodos);
  } catch (error) {
    console.error('Error marking task as done:', error);
  }
};


  return (
    <div className="home-page">
      <Header />
      <div className="content">
        <TodoForm
          onAddTodo={handleAddTodo}
          onEditTodo={handleEditTodo}
          editingTodo={editingTodo}
        />
        <TodoList
          todos={todos}
          onEditTodo={(todo) => setEditingTodo(todo)}
          onMarkAsDone={handleMarkAsDone}
        />
      </div>
    </div>
  );
}

export default HomePage;







