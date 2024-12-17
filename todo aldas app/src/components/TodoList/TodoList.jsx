import './TodoList.css';

function TodoList() {
  const todos = [
    "Example Todo 1 dfgdfhfhddfg dfg dgd fg d  dfgsd sdfg sder rt fgh ftr trfgh fgf  fggh fhd f",
    "Example Todo 2",
    "Example Todo 3",
    "Example Todo 4",
    "Example Todo 5",
    "Example Todo 6",
  ];

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

export default TodoList;

