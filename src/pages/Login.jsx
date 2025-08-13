import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserShield } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // API call to the backend login endpoint
      const response = await fetch('https://web-security-website-api-1.onrender.com/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Assume login is successful and the user is whitelisted
        // You would typically store a JWT token here
        localStorage.setItem('token', data.token);
        navigate('/');
        window.location.reload();
      } else {
        // Handle login errors from the backend
        setError(data.error || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-dark-background text-text-light">
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-dark-secondary p-10 rounded-xl shadow-lg border border-neon-blue border-opacity-30 max-w-lg w-full"
      >
        <div className="flex justify-center mb-6">
          <FaUserShield className="text-neon-blue text-6xl" />
        </div>
        <h2 className="text-4xl font-bold font-mono text-center text-neon-blue mb-8 tracking-wide">
          Member Login
        </h2>
        <form onSubmit={handleLogin}>
          {error && <div className="text-red-500 text-center mb-4">{error}</div>}
          <div className="mb-6">
            <label className="block text-text-gray text-lg font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-4 rounded-md bg-dark-background text-text-light border border-dark-secondary focus:outline-none focus:ring-2 focus:ring-neon-blue transition-all duration-200"
              required
            />
          </div>
          <div className="mb-8">
            <label className="block text-text-gray text-lg font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 rounded-md bg-dark-background text-text-light border border-dark-secondary focus:outline-none focus:ring-2 focus:ring-neon-blue transition-all duration-200"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-4 rounded-md font-mono font-bold text-xl transition-transform duration-200 hover:scale-105 active:scale-95 bg-neon-blue text-dark-background hover:bg-neon-green hover:text-dark-background"
            disabled={loading}
          >
            {loading ? 'Logging In...' : 'LOGIN'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;