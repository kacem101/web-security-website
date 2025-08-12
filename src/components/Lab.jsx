// frontend/src/components/Lab.jsx

import React, { useState } from 'react';

const Lab = ({ lab, onLabSolved }) => {
    const [submittedFlag, setSubmittedFlag] = useState('');
    const [message, setMessage] = useState('');
    const [isSolved, setIsSolved] = useState(false);

    // This is the function that handles flag submission
    const handleFlagSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`https://web-security-website-api-1.onrender.com/api/labs/check-flag/${lab.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ submittedFlag })
            });

            const data = await response.json();
            if (response.ok) {
                setMessage(data.message);
                setIsSolved(true);
                if (onLabSolved) onLabSolved(lab.id);
            } else {
                setMessage(data.message);
                setIsSolved(false);
            }
        } catch (error) {
            setMessage('An error occurred while checking the flag.');
        }
    };

    return (
        <div style={{ padding: '20px', backgroundColor: '#1e1e1e', color: '#f0f0f0' }}>
            <h1>Lab: {lab.name}</h1>
            
            <iframe
                src={`http://localhost:${lab.hostPort}`}
                width="100%"
                height="500px"
                style={{ border: '1px solid #555' }}
                title={lab.name}
            ></iframe>

            <hr style={{ margin: '20px 0', borderColor: '#555' }} />

            {isSolved ? (
                <div style={{ backgroundColor: '#4CAF50', padding: '10px', borderRadius: '5px' }}>
                    <h2>🎉 Congratulations!</h2>
                    <p>{message}</p>
                </div>
            ) : (
                <form onSubmit={handleFlagSubmit} style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                    <input
                        type="text"
                        placeholder="Enter flag here..."
                        value={submittedFlag}
                        onChange={(e) => setSubmittedFlag(e.target.value)}
                        style={{ padding: '8px', flexGrow: 1, backgroundColor: '#333', color: '#fff', border: '1px solid #555' }}
                    />
                    <button type="submit" style={{ padding: '8px 12px', backgroundColor: '#007BFF', color: 'white', border: 'none', cursor: 'pointer' }}>
                        Submit Flag
                    </button>
                </form>
            )}

            {message && !isSolved && (
                <p style={{ marginTop: '10px', color: '#ff6347' }}>{message}</p>
            )}
            
            <button onClick={() => onLabSolved(null)} style={{ marginTop: '20px', padding: '8px 12px', backgroundColor: '#6c757d', color: 'white', border: 'none', cursor: 'pointer' }}>
                Back to Labs
            </button>
        </div>
    );
};

export default Lab;