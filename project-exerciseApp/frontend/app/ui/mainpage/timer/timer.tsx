import React, { useState, useEffect } from 'react';

const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const [intervalId, setIntervalId] = useState<number | undefined>(undefined);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isActive) {
      intervalId = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isActive]);

  const handleStartStop = () => {
    setIsActive((prevIsActive) => !prevIsActive);
  };

  const handleReset = () => {
    setSeconds(0);
    setIsActive(false);
  };

  return (
    <div>
      <h1>Timer: {seconds} seconds</h1>
      <button onClick={handleStartStop}>{isActive ? 'Pause' : 'Start'}</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
};

export default Timer;