import Header from '../../components/Header/Header';
import TodoList from '../../components/TodoList/TodoList';
import TodoForm from '../../components/TodoForm/TodoForm';
import { API_URL } from '../../config/Api_URL';
import './HomePage.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function HomePage() {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/todos`); 
      setTodos(response.data); 
    } catch (error) {
      console.error('Klaida gaunant duomenis iš serverio:', error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleAddTodo = (title, description) => {
    const newTodo = `${title}: ${description}`;
    setTodos((prevTodos) => [...prevTodos, newTodo]);
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




