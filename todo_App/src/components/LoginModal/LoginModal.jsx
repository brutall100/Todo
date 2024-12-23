import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { API_URL_REG_LOG } from '../../config/API_URL_REG_LOG';
import './LoginModal.css';

const LoginModal = ({ onClose, setIsLoggedIn, setUserEmail }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [identifier, setIdentifier] = useState(''); // This will be either name or email
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const toggleMode = () => setIsLogin(!isLogin);

  const updateName = useCallback((e) => setName(e.target.value), []);
  const updateEmail = useCallback((e) => setEmail(e.target.value), []);
  const updateIdentifier = useCallback((e) => setIdentifier(e.target.value), []);
  const updatePassword = useCallback((e) => setPassword(e.target.value), []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    const endpoint = `/api/auth/${isLogin ? 'login' : 'register'}`;

    // Prepare the request body based on login or register mode
    const requestBody = isLogin
      ? { identifier, password } // 'identifier' can be either email or name for login
      : { name, email, password }; // For registration, send name, email, and password

    try {
      const response = await fetch(`${API_URL_REG_LOG}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      if (response.ok) {
        if (isLogin) {
          setMessage('Login successful');
          localStorage.setItem('token', data.token); // Store the JWT token
          localStorage.setItem('email', identifier); // Store the identifier (email or name)
          setIsLoggedIn(true); // Set login state in Header component
          setUserEmail(identifier); // Set the user email or name in Header component
          onClose(); // Close the modal
        } else {
          setMessage('Registration successful. Please log in.');
          setIsLogin(true); // Switch to login mode after successful registration
        }
      } else {
        setMessage(data.message || 'An error occurred');
      }
    } catch {
      setMessage('Server error. Please try again later.');
    }
  }, [isLogin, identifier, name, email, password, setIsLoggedIn, setUserEmail, onClose]);

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2>{isLogin ? 'Login' : 'Register'}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={updateName}
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={updateEmail}
                required
              />
            </>
          )}
          {isLogin && (
            <input
              type="text"
              placeholder="Email or Name"
              value={identifier}
              onChange={updateIdentifier}
              required
            />
          )}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={updatePassword}
            required
          />
          <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
        </form>
        <p>
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <span onClick={toggleMode} className="toggle-link">
            {isLogin ? 'Register' : 'Login'}
          </span>
        </p>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

LoginModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  setIsLoggedIn: PropTypes.func.isRequired,
  setUserEmail: PropTypes.func.isRequired,
};

export default LoginModal;





