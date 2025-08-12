import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const UserProgress = ({ isCompleted }) => {
  if (!isCompleted) {
    return null;
  }

  return (
    <span className="ml-4 flex items-center text-neon-green text-sm">
      <FaCheckCircle className="mr-1" />
      Completed
    </span>
  );
};

export default UserProgress;