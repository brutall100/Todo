import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import AboutPage from './pages/AboutPage/AboutPage'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'

function App() {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/about' element={<AboutPage />} />
				<Route path='*' element={<NotFoundPage />} />
			</Routes>
		</Router>
	)
}

export default App

// npm start
// Palesime aplikacija 
