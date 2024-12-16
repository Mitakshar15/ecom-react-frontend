import React, { useEffect, useState } from 'react';

const LogoutCountdown = ({ open, timeLeft, onClose }) => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (timeLeft > 0) {
      setMinutes(Math.floor(timeLeft / 1000 / 60));
      setSeconds(Math.floor((timeLeft / 1000) % 60));
    }
  }, [timeLeft]);

  if (!open) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0,0,0,0.5)',
        zIndex: 1000
      }}
    >
      <h2>Automatic Logout Warning</h2>
      <p>You will be automatically logged out in</p>
      <p style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center' }}>
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </p>
      <p>due to inactivity</p>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default LogoutCountdown; 