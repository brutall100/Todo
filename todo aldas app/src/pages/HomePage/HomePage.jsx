import Header from '../../components/Header/Header'
import TodoList from '../../components/TodoList/TodoList'
import './HomePage.css'

function HomePage() {
	return (
		<div className='home-page'>
			<Header />
			<div className='content'>
				<TodoList />
				<button className='add-todo-button'>Add Todo</button>
			</div>
		</div>
	)
}

export default HomePage
