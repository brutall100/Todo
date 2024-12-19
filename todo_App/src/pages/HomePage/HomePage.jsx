import Header from '../../components/Header/Header';
import TodoList from '../../components/TodoList/TodoList';
import TodoForm from '../../components/TodoForm/TodoForm';
import './HomePage.css';
import { useState } from 'react';

function HomePage() {
  const [todos, setTodos] = useState([
    "Example Todo 1 dfgdfhfhddfg dfg dgd fg d  dfgsd sdfg sder rt fgh ftr trfgh fgf  fggh fhd f",
    "Example Todo 2",
    "Example Todo 3",
    "Example Todo 4",
    "Example Todo 5",
    "Example Todo 6",
  ]);

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



