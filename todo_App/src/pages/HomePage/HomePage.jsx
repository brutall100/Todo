import Header from '../../components/Header/Header';
import TodoList from '../../components/TodoList/TodoList';
import TodoForm from '../../components/TodoForm/TodoForm';
import { API_URL } from '../../config/Api_URL';
import './HomePage.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function HomePage() {
  const [todos, setTodos] = useState([]);

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
    };
    
    try {
      await axios.post(`${API_URL}/api/todos`, newTodo);

      // Optimized part - directly update todos list without making a network call
      setTodos(previousTodos => [
        ...previousTodos,
        newTodo
      ]);
    } catch (error) {
      console.error('Error adding new task:', error);
    }
  };

  return (
    <div className="home-page">
      <Header />
      <div className="content">
        <TodoForm onAddTodo={handleAddTodo} />
        <TodoList todos={todos} />
      </div>
    </div>
  );
}

export default HomePage;






