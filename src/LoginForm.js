// LoginForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import axios from 'axios';

const LoginForm = ({ setLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const errorAnimation = useSpring({
    opacity: error ? 1 : 0,
    transform: `translateY(${error ? 0 : -20}px)`,
    config: { tension: 300, friction: 20 },
  });

  const handleLogin = async () => {
    try {
      // Simulate login request
      const response = await axios.post('http://localhost:5000/login', { username, password });
      const { token } = response.data;

      // You can store the token in local storage or cookies for authentication

      // Clear any previous errors
      setError('');

      // Set logged in status
      setLoggedIn(true);

      // Redirect to welcome page after successful login
      navigate('/welcome');
    } catch (error) {
      console.error('Login Error:', error.response?.data?.error || 'Internal server error');

      if (error.response?.status === 401) {
        setError('Invalid username or password');
      } else {
        setError('An error occurred during login');
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-gray-100 p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <animated.div style={errorAnimation}>
          {error && <p className="text-red-500 mb-4">{error}</p>}
        </animated.div>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-600">Username</label>
          <input
            type="text"
            id="username"
            className="w-full p-2 border rounded"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-600">Password</label>
          <input
            type="password"
            id="password"
            className="w-full p-2 border rounded"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
