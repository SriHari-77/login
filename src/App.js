import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
