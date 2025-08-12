import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';

const LabList = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [labState, setLabState] = useState(null);
  const [labInfo, setLabInfo] = useState(null);
  const [error, setError] = useState(null);
  const [flag, setFlag] = useState('');
  const [message, setMessage] = useState('');
  const [userProgress, setUserProgress] = useState({});

  // Define labs for each category
  const labs = {
    'xss': [
      { id: 'xss-lab-1', name: 'Reflected XSS Lab', flag: 'XSS_FLAG_12345' },
      { id: 'xss-lab-2', name: 'Stored XSS Lab' }
    ],
    'sql-injection': [
      { id: 'sql-injection-lab-1', name: 'Basic SQL Injection Lab' },
    ]
  };

  const currentCategoryLabs = labs[category] || [];

  const fetchUserProgress = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await fetch('https://web-security-website-api-1.onrender.com/api/users/profile', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setUserProgress(data.progress || {});
      }
    } catch (err) {
      console.error('Failed to fetch user progress:', err);
    }
  };

  useEffect(() => {
    fetchUserProgress();
  }, []);

  const startLab = async (labId) => {
    setLabState(labId);
    setError(null);
    setMessage('');
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`https://web-security-website-api-1.onrender.com/api/labs/start/${labId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to start lab. Check server logs.');
      }

      const data = await response.json();
      setLabInfo({ ...data, labId });
      setLabState('running');
    } catch (err) {
      console.error(err);
      setError(err.message);
      setLabState(null);
    }
  };

  const stopLab = async () => {
    const token = localStorage.getItem('token');
    const containerId = labInfo.containerId;

    try {
      await fetch(`https://web-security-website-api-1.onrender.com/api/labs/stop/${containerId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      setLabState(null);
      setLabInfo(null);
      setFlag('');
    } catch (err) {
      console.error('Failed to stop lab:', err);
      setLabState(null);
      setLabInfo(null);
      setFlag('');
    }
  };

  const submitFlag = async () => {
    const token = localStorage.getItem('token');
    const labId = labInfo.labId;

    try {
      const response = await fetch(`https://web-security-website-api-1.onrender.com/api/labs/check-flag/${labId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ submittedFlag: flag }), // <-- Corrected line
      });

      const data = await response.json();
      setMessage(data.message);

      if (response.ok) {
        fetchUserProgress();
        stopLab();
      }
    } catch (err) {
      console.error(err);
      setMessage('An error occurred during flag submission.');
    }
  };

  return (
    <div className="min-h-screen bg-dark-background text-text-light p-8">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <h2 className="text-4xl font-mono font-bold text-neon-blue mb-8 text-center">
          {category.toUpperCase()} Labs
        </h2>
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        {labState === 'running' ? (
          <div>
            <h3 className="text-2xl font-mono text-center text-neon-green mb-4">
              Lab is Running on Port {labInfo.hostPort}
            </h3>
            <div className="w-full h-[600px] bg-dark-secondary rounded-lg overflow-hidden border border-neon-blue">
              <iframe
                src={`http://localhost:${labInfo.hostPort}`}
                title="Vulnerable Lab"
                className="w-full h-full border-none"
              ></iframe>
            </div>
            <div className="mt-4 flex space-x-4">
              <input
                type="text"
                placeholder="Enter Flag"
                value={flag}
                onChange={(e) => setFlag(e.target.value)}
                className="flex-grow p-3 rounded-md bg-dark-background text-text-light"
              />
              <button
                onClick={submitFlag}
                className="py-3 px-6 rounded-md font-mono font-bold text-lg transition-transform duration-200 bg-neon-blue text-dark-background hover:bg-neon-green"
              >
                Submit Flag
              </button>
              <button
                onClick={stopLab}
                className="py-3 px-6 rounded-md font-mono font-bold text-lg transition-transform duration-200 bg-red-600 text-white"
              >
                Stop Lab
              </button>
            </div>
            {message && <div className="mt-4 text-center text-lg">{message}</div>}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {currentCategoryLabs.map(lab => (
              <motion.div key={lab.id} whileHover={{ scale: 1.02 }} className="bg-dark-secondary p-4 rounded-lg flex justify-between items-center">
                <span className="text-xl font-mono">
                  {lab.name}
                  {userProgress[lab.id]?.completed && (
                    <span className="ml-4 text-neon-green text-sm"> (Completed)</span>
                  )}
                </span>
                <button
                  onClick={() => startLab(lab.id)}
                  className="py-2 px-4 rounded-md font-mono font-bold text-lg bg-neon-blue text-dark-background hover:bg-neon-green transition-colors duration-200"
                >
                  Start Lab
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default LabList;