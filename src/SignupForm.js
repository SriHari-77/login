import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import axios from 'axios';

const SignupForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [emailExistsAnimation, setEmailExistsAnimation] = useState(false);

  const successAnimation = useSpring({
    opacity: signupSuccess ? 1 : 0,
    transform: `scale(${signupSuccess ? 1 : 0.5})`,
    config: { tension: 300, friction: 20 },
  });

  const errorAnimation = useSpring({
    opacity: error || emailExistsAnimation ? 1 : 0,
    transform: `translateY(${error || emailExistsAnimation ? 0 : -20}px)`,
    config: { tension: 300, friction: 20 },
  });

  const handleSignup = async () => {
    try {
      // Check if the email already exists
      const emailExists = await checkEmailExists(email);

      if (emailExists) {
        setError('Email is already taken');
        setEmailExistsAnimation(true);

        // Reset the emailExistsAnimation after a certain delay (e.g., 3 seconds)
        setTimeout(() => {
          setEmailExistsAnimation(false);
        }, 3000);

        return;
      }

      // Check if first name, last name, and password are provided
      if (!firstName) {
        setError('First name is required');
        setSignupSuccess(false);
        return;
      }

      if (!lastName) {
        setError('Last name is required');
        setSignupSuccess(false);
        return;
      }

      if (!password) {
        setError('Password is required');
        setSignupSuccess(false);
        return;
      }

      // If email doesn't exist and all required fields are provided, proceed with signup
      await axios.post('http://localhost:5000/signup', { email, firstName, lastName, password });

      // Clear any previous errors and indicate success
      setError('');
      setSignupSuccess(true);

      // Redirect to the login page after a successful signup
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error) {
      console.error('Signup Error:', error.response?.data?.error || 'Internal server error');
      setError('Email Already Existed');
    }
  };

  const checkEmailExists = async (emailToCheck) => {
    try {
      const response = await axios.get(`http://localhost:5000/checkEmail/${emailToCheck}`);
      return response.data.exists;
    } catch (error) {
      console.error('Email Check Error:', error.response?.data?.error || 'Internal server error');
      return false; // Assume email doesn't exist on error
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">Sign Up</h2>
        <animated.div style={errorAnimation}>
          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
          {emailExistsAnimation && <p className="text-red-500 mb-4 text-center">Email is already taken</p>}
        </animated.div>
        <animated.div style={successAnimation} className="mb-4 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="green"
            className="h-6 w-6 mr-2"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          <p className="text-green-500">Signup successful!</p>
        </animated.div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-600">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full p-2 border rounded"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="firstName" className="block text-gray-600">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            className="w-full p-2 border rounded"
            placeholder="Enter your first name"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="lastName" className="block text-gray-600">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            className="w-full p-2 border rounded"
            placeholder="Enter your last name"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-600">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full p-2 border rounded"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div className="flex justify-between items-center">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none w-full"
            onClick={handleSignup}
          >
            Sign Up
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none w-full ml-2"
            onClick={() => navigate('/login')}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
