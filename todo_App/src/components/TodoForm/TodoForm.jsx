import { useState, useEffect } from 'react';
import './TodoForm.css';
import PropTypes from 'prop-types';

function TodoForm({ onAddTodo, onEditTodo, editingTodo }) {
  const [todoTitle, setTodoTitle] = useState('');
  const [todoDescription, setTodoDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (editingTodo) {
      setTodoTitle(editingTodo.title);
      setTodoDescription(editingTodo.description);
    }
  }, [editingTodo]);

  const handleAddTodo = (e) => {
    e.preventDefault();

    if (todoTitle.trim() === '' || todoDescription.trim() === '') {
      setErrorMessage('Both title and description are required');
      return;
    }

    setErrorMessage('');
    if (editingTodo) {
      onEditTodo(editingTodo.id, todoTitle, todoDescription);
    } else {
      onAddTodo(todoTitle, todoDescription);
    }

    setTodoTitle('');
    setTodoDescription('');
  };

  return (
    <form className="todo-form" onSubmit={handleAddTodo}>
      <input
        type="text"
        className="todo-input"
        placeholder="Enter todo title"
        value={todoTitle}
        onChange={(e) => setTodoTitle(e.target.value)}
      />
      <textarea
        className="todo-textarea"
        placeholder="Enter todo description"
        value={todoDescription}
        onChange={(e) => setTodoDescription(e.target.value)}
      />
      <button type="submit" className="add-todo-button">
        {editingTodo ? 'Save Changes' : 'Add Todo'}
      </button>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </form>
  );
}

TodoForm.propTypes = {
  onAddTodo: PropTypes.func.isRequired,
  onEditTodo: PropTypes.func.isRequired,
  editingTodo: PropTypes.object,
};

export default TodoForm;


