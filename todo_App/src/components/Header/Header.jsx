import { useState, useEffect } from 'react';
import LoginModal from '../LoginModal/LoginModal';
import './Header.css';

function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  // Check localStorage on initial load
  useEffect(() => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');

    if (token && email) {
      setIsLoggedIn(true);
      setUserEmail(email);
    }
  }, []);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const logout = () => {
    localStorage.removeItem('token'); // Remove the token
    localStorage.removeItem('email'); // Remove the email
    setIsLoggedIn(false); // Reset login state
    setUserEmail(''); // Clear the email
  };

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
          setIsLoggedIn={setIsLoggedIn} 
          setUserEmail={setUserEmail} 
        />
      )}
    </header>
  );
}

export default Header;






