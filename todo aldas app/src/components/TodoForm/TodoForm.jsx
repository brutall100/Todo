import { useState } from 'react';
import './TodoForm.css';
import PropTypes from 'prop-types';

function TodoForm({ onAddTodo }) {
	const [todoTitle, setTodoTitle] = useState('');
	const [todoDescription, setTodoDescription] = useState('');

	const handleAddTodo = (e) => {
		e.preventDefault();
		if (todoTitle.trim() !== '' && todoDescription.trim() !== '') {
			onAddTodo(todoTitle, todoDescription);
			setTodoTitle('');
			setTodoDescription('');
		}
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
				Add Todo
			</button>
		</form>
	);
}
TodoForm.propTypes = {
	onAddTodo: PropTypes.func.isRequired,
};

export default TodoForm;

