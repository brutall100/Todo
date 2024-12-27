import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState(''); // State for user's name

  useEffect(() => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');

    if (token && email) {
      setIsLoggedIn(true);
      setUserEmail(email);
      fetchUserData(token); // Fetch user data on component mount
    }
  }, []);

  const fetchUserData = async (token) => {
    try {
      const response = await axios.get('/api/users/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data && response.data.name) {
        setUserName(response.data.name);
      } else {
        console.error('Failed to fetch user name');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      logout(); // Clear state if token is invalid
    }
  };

  const login = (email, token) => {
    localStorage.setItem('email', email);
    localStorage.setItem('token', token);
    setIsLoggedIn(true);
    setUserEmail(email);
    fetchUserData(token); // Fetch user data on successful login
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    setIsLoggedIn(false);
    setUserEmail('');
    setUserName('');
  };

  return (
    <UserContext.Provider 
      value={{ 
        isLoggedIn, 
        userEmail, 
        userName, 
        login, 
        logout, 
        setIsLoggedIn, 
        setUserEmail, 
        setUserName,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserContext;






