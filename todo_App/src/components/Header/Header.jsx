import { useState, useContext } from 'react';
import UserContext from '../../components/UserContext';
import LoginModal from '../LoginModal/LoginModal';
import './Header.css';

function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isLoggedIn, userEmail, logout } = useContext(UserContext); //?? Access context values

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <header className="header">
      <nav className="nav">
        <ul className="nav-list">
          <li className="nav-item">
            <a href="/" className="nav-link">Namai</a>
          </li>
          <li className="nav-item">
            <a href="/about" className="nav-link">Apie</a>
          </li>
          <li className="nav-item">
            <a href="/features" className="nav-link">DII Pasiulymai</a>
          </li>
          <li className="nav-item">
            <a href="/contact" className="nav-link">Susisiekime</a>
          </li>
        </ul>
      </nav>

      {!isLoggedIn ? (
        <button onClick={toggleModal}>Login / Register</button>
      ) : (
        <div>
          <p className="welcome-message">Welcome back, {userEmail}!</p>
          <button onClick={logout} className="logout-button">Logout</button>
        </div>
      )}

      {isModalOpen && (
        <LoginModal 
          onClose={toggleModal} 
        />
      )}
    </header>
  );
}

export default Header;







