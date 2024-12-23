import Header from '../../components/Header/Header';
import TodoList from '../../components/TodoList/TodoList';
import TodoForm from '../../components/TodoForm/TodoForm';
import { API_URL } from '../../config/Api_URL';
import './HomePage.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function HomePage() {
  const [todos, setTodos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);

  // Fetch Todos from the API
  const fetchTodos = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/todos`);
      const normalizedTodos = response.data.map((todo) => ({
        ...todo,
        id: todo._id || todo.id, // Ensure consistent `id` property
      }));
      setTodos(normalizedTodos);
    } catch (error) {
      console.error('Error fetching data from server:', error);
    }
  };
  

  // Fetch Categories from the API
  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/categories`);
      setCategories(response.data); // Store categories
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchTodos();
    fetchCategories(); // Fetch categories when the page loads
  }, []);

  const handleAddTodo = async (title, description, category) => {
    const newTodo = {
      title: title,
      description: description,
      category: category,
      done: false, // Default to not done
    };
  
    try {
      const response = await axios.post(`${API_URL}/api/todos`, newTodo);
  
      // Normalize the response data to ensure `id` is consistent
      const createdTodo = {
        ...response.data,
        id: response.data._id || response.data.id, // Map `_id` to `id` if necessary
      };
  
      setTodos((previousTodos) => [...previousTodos, createdTodo]);
    } catch (error) {
      console.error('Error adding new task:', error);
    }
  };
  
  
  const handleEditTodo = async (id, title, description, category) => {
    if (!id) {
      console.error('Cannot update todo: id is undefined');
      return;
    }
  
    const updatedTodo = { title, description, category };
    console.log('Updating todo:', id, updatedTodo);
  
    try {
      await axios.put(`${API_URL}/api/todos/${id}`, updatedTodo);
      const updatedTodos = todos.map((todo) =>
        todo.id === id ? { ...todo, title, description, category } : todo
      );
      setTodos(updatedTodos);
      setEditingTodo(null);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };
  
  
  
  
  

  const handleMarkAsDone = async (id) => {
    try {
      const todoToUpdate = todos.find((todo) => todo.id === id);
      const updatedTodo = { ...todoToUpdate, done: !todoToUpdate.done };

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
          categories={categories}  // Pass categories to TodoForm
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







