import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';

const LabList = () => {
    const { category } = useParams();
    const [selectedLab, setSelectedLab] = useState(null);
    const [flag, setFlag] = useState('');
    const [message, setMessage] = useState('');
    const [userProgress, setUserProgress] = useState({});
    const [error, setError] = useState(null);

    const labs = {
        'xss': [
            { 
                id: 'xss-lab-1', 
                name: 'Reflected XSS Lab', 
                description: 'This lab is vulnerable to a simple reflected Cross-Site Scripting attack. Your goal is to inject a script that executes in the user\'s browser.',
                instructions: '1. Make sure you have Docker installed.\n2. Run the following command in your terminal:\ndocker-compose up --build xss-lab-1\n3. Navigate to http://localhost:8080 in your browser to start the lab.',
            },
            { 
                id: 'xss-lab-2', 
                name: 'Stored XSS Lab', 
                description: 'This lab demonstrates a stored Cross-Site Scripting vulnerability. A message board allows you to inject malicious scripts that get stored in the database.',
                instructions: '1. Make sure you have Docker installed.\n2. Run the following command in your terminal:\ndocker-compose up --build xss-lab-2\n3. Navigate to http://localhost:8081 in your browser to start the lab.',
            },
            { 
                id: 'xss-lab-3', 
                name: 'DOM-based XSS Lab', 
                description: 'This lab demonstrates a DOM-based Cross-Site Scripting vulnerability. The vulnerability lies in the client-side code rather than the server-side.',
                instructions: '1. Make sure you have Docker installed.\n2. Run the following command in your terminal:\ndocker-compose up --build xss-lab-3\n3. Navigate to http://localhost:8082 in your browser to start the lab.',
            }
        ],
        'sql-injection': [
            { 
                id: 'sql-injection-lab-1', 
                name: 'Basic SQL Injection Lab', 
                description: 'This lab is vulnerable to a basic SQL Injection attack. Try to bypass the login form by injecting a malicious string into the username or password field.',
                instructions: '1. Make sure you have Docker installed.\n2. Run the following command in your terminal:\ndocker-compose up --build sqli-lab-1\n3. Navigate to http://localhost:8083 in your browser to start the lab.',
            },
            { 
                id: 'sql-injection-lab-2', 
                name: 'Error-Based SQL Injection Lab', 
                description: 'This lab is vulnerable to error-based SQL injection, where the database returns error messages that reveal information about the database structure.',
                instructions: '1. Make sure you have Docker installed.\n2. Run the following command in your terminal:\ndocker-compose up --build sqli-lab-2\n3. Navigate to http://localhost:8084 in your browser to start the lab.',
            },
            { 
                id: 'sql-injection-lab-3', 
                name: 'Time-Based Blind SQL Injection Lab', 
                description: 'This lab is vulnerable to time-based blind SQL injection, where there are no error messages or visible output. The success of the attack is inferred by the response time of the server.',
                instructions: '1. Make sure you have Docker installed.\n2. Run the following command in your terminal:\ndocker-compose up --build sqli-lab-3\n3. Navigate to http://localhost:8085 in your browser to start the lab.',
            }
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

    const selectLab = (lab) => {
        setSelectedLab(lab);
        setMessage('');
        setFlag('');
    };

    const submitFlag = async () => {
        const token = localStorage.getItem('token');
        const labId = selectedLab.id;

        try {
            const response = await fetch(`https://web-security-website-api-1.onrender.com/api/labs/check-flag/${labId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ submittedFlag: flag }),
            });

            const data = await response.json();
            setMessage(data.message);

            if (response.ok) {
                fetchUserProgress();
                setSelectedLab(null); 
            }
        } catch (err) {
            console.error(err);
            setMessage('An error occurred during flag submission.');
        }
    };

    const renderLabList = () => (
        <div className="grid grid-cols-1 gap-4">
            {currentCategoryLabs.map(lab => (
                <motion.div 
                    key={lab.id} 
                    whileHover={{ scale: 1.02 }} 
                    className="bg-dark-secondary p-4 rounded-lg flex justify-between items-center cursor-pointer"
                    onClick={() => selectLab(lab)}
                >
                    <span className="text-xl font-mono">
                        {lab.name}
                        {userProgress[lab.id]?.completed && (
                            <span className="ml-4 text-neon-green text-sm"> (Completed)</span>
                        )}
                    </span>
                    <span className="py-2 px-4 rounded-md font-mono font-bold text-lg bg-neon-blue text-dark-background hover:bg-neon-green transition-colors duration-200">
                        View Lab
                    </span>
                </motion.div>
            ))}
        </div>
    );

    const renderLabDetails = () => (
        <div>
            <h3 className="text-2xl font-mono text-neon-green mb-4">{selectedLab.name}</h3>
            <p className="mb-4">{selectedLab.description}</p>
            
            <div className="bg-dark-secondary p-4 rounded-lg mb-4">
                <h4 className="text-xl font-mono text-neon-blue mb-2">Instructions:</h4>
                <pre className="whitespace-pre-wrap">{selectedLab.instructions}</pre>
                
                <a 
                  href="https://github.com/user-attachments/files/21757866/vulnerable_labs.zip" 
                  download 
                  className="mt-4 py-2 px-4 rounded-md font-mono font-bold text-lg bg-neon-green text-dark-background hover:bg-neon-blue transition-colors duration-200 inline-block"
                >
                  Download Lab Files
                </a>
            </div>

            <div className="mt-4 flex flex-col space-y-4">
                <input
                    type="text"
                    placeholder="Enter Flag"
                    value={flag}
                    onChange={(e) => setFlag(e.target.value)}
                    className="flex-grow p-3 rounded-md bg-dark-background text-text-light border border-gray-600"
                />
                <button
                    onClick={submitFlag}
                    className="py-3 px-6 rounded-md font-mono font-bold text-lg transition-transform duration-200 bg-neon-blue text-dark-background hover:bg-neon-green"
                >
                    Submit Flag
                </button>
            </div>
            {message && <div className="mt-4 text-center text-lg">{message}</div>}
            <button 
                onClick={() => setSelectedLab(null)} 
                className="mt-6 py-2 px-4 rounded-md font-mono font-bold text-lg bg-red-600 text-white transition-transform duration-200"
            >
                Back to Lab List
            </button>
        </div>
    );

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
                {selectedLab ? renderLabDetails() : renderLabList()}
            </motion.div>
        </div>
    );
};

export default LabList;