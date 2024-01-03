// ConfettiPage.js
import React from 'react';
import Confetti from 'react-confetti';

const ConfettiPage = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <Confetti width={window.innerWidth} height={window.innerHeight} />
      <h2 className="text-4xl font-semibold text-center text-green-500">Welcome!</h2>
    </div>
  );
};

export default ConfettiPage;
