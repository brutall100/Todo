import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import AboutPage from './pages/AboutPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
	return (
		<Router>
			<Routes>
        <p>dfsdsfsdf</p>
				<Route path='/' element={<HomePage />} />
				<Route path='/about' element={<AboutPage />} />
				<Route path='*' element={<NotFoundPage />} />
			</Routes>
		</Router>
	)
}

export default App
