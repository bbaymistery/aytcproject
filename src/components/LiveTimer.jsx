import React, { useState, useEffect } from 'react';

const LiveTimer = ({ initialDays = 5, initialHours = 2, initialMinutes = 12, initialSeconds = 56 }) => {
  const [targetDate] = useState(() => {
    const now = new Date().getTime();
    return now + initialDays * 86400000 + initialHours * 3600000 + initialMinutes * 60000 + initialSeconds * 1000;
  });

  const [timeLeft, setTimeLeft] = useState(targetDate - new Date().getTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(targetDate - new Date().getTime());
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  if (timeLeft <= 0) return <span>Bitdi</span>;

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  return (
    <span>
      {String(days).padStart(2, '0')} Gün {String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
    </span>
  );
};

export default LiveTimer;
