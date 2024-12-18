import './TodoList.css';
import PropTypes from 'prop-types';

function TodoList({ todos }) {
  return (
    <div className="todo-list">
      <h2 className="todo-list-title">Mano darbai</h2>
      <ul className="todo-grid">
        {todos.map((todo, index) => (
          <li key={index} className="todo-item">
            {todo}
          </li>
        ))}
      </ul>
    </div>
  );
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default TodoList;


