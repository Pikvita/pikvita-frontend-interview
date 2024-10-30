import React from 'react';

const Score = ({ score }) => {
  return (
    <div className="score-container">
      <h2>Your Score: {score}</h2>
    </div>
  );
};

export default Score;
