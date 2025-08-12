import React, { useEffect, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';

const UserGreeting = () => {
  const [username, setUsername] = useState('User');

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await fetch('https://web-security-api.onrender.com/api/users/profile', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          if (response.ok) {
            const data = await response.json();
            setUsername(data.username);
          }
        } catch (error) {
          console.error('Failed to fetch user data:', error);
        }
      }
    };
    fetchUserData();
  }, []);

  return (
    <div className="flex items-center space-x-2 text-text-light font-mono text-lg">
      <FaUserCircle className="text-neon-blue text-2xl" />
      <span>Welcome, {username}!</span>
    </div>
  );
};

export default UserGreeting;