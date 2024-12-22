import PropTypes from 'prop-types';
import './TodoList.css';

function TodoList({ todos }) {
  if (!todos || !Array.isArray(todos)) {
    return <div>No todos available</div>;
  }

  return (
    <ul className="todo-list">
      {todos.map((todo, index) => {
        if (!todo || !todo.title) {
          return null; // Skip malformed todos
        }

        return (
          <li key={index} className="todo-item">
            <h3>{todo.title}</h3>
            <p>{todo.description}</p>
          </li>
        );
      })}
    </ul>
  );
}

TodoList.propTypes = {
  todos: PropTypes.array.isRequired,
};

export default TodoList;




